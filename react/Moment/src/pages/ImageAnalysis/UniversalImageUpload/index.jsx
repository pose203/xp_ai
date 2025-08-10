import { useRef, useState } from 'react';
import { Image, Loading, Button, ActionSheet } from 'react-vant';
import { AddO, DeleteO, Edit, PhotoO } from '@react-vant/icons';
import { 
  compressImage, 
  validateImageFile, 
  getImageInfo 
} from '@/utils/imageProcessor';
import styles from './universal-image-upload.module.css';

/**
 * 通用图片上传组件
 * @param {Object} props
 * @param {boolean} props.visible - 是否显示组件
 * @param {Function} props.onClose - 关闭组件回调
 * @param {Function} props.onImagesChange - 图片变化回调
 * @param {Array} props.initialImages - 初始图片列表
 * @param {Object} props.config - 配置选项
 * @param {string} props.mode - 显示模式：'modal'(弹窗) | 'inline'(内联)
 * @param {string} props.uploadType - 上传类型：'avatar' | 'gallery' | 'post'
 */
const UniversalImageUpload = ({ 
  visible = false,
  onClose,
  onImagesChange,
  initialImages = [],
  config = {},
  mode = 'modal',
  uploadType = 'gallery'
}) => {
  const uploadRef = useRef(null);
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 默认配置
  const defaultConfig = {
    avatar: {
      multiple: false,
      maxCount: 1,
      maxWidth: 256,
      maxHeight: 256,
      quality: 0.9,
      showPresets: true,
      title: '选择头像',
      description: '从相册选择图片或使用预设头像',
      maxSize: 5 * 1024 * 1024, // 5MB
      accept: 'image/*'
    },
    gallery: {
      multiple: true,
      maxCount: 9,
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.8,
      showPresets: false,
      title: '上传图片',
      description: '选择要上传的图片',
      maxSize: 10 * 1024 * 1024, // 10MB
      accept: 'image/*'
    },
    post: {
      multiple: true,
      maxCount: 6,
      maxWidth: 1200,
      maxHeight: 900,
      quality: 0.85,
      showPresets: false,
      title: '添加图片',
      description: '为你的动态添加精彩图片',
      maxSize: 8 * 1024 * 1024, // 8MB
      accept: 'image/*'
    }
  };

  // 合并配置
  const finalConfig = { ...defaultConfig[uploadType], ...config };

  // 预设头像库（仅头像类型使用）
  const presetAvatars = [
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
    'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
    'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
    'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
    'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
    'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
    'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face'
  ];

  // 显示消息函数
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  // 处理文件选择
  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    // 检查数量限制
    if (images.length + files.length > finalConfig.maxCount) {
      showMessage('error', `最多只能上传${finalConfig.maxCount}张图片`);
      return;
    }

    setUploading(true);
    
    try {
      const processedImages = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // 验证文件
        const validation = validateImageFile(file, { maxSize: finalConfig.maxSize });
        if (!validation.valid) {
          showMessage('error', validation.errors[0]);
          continue;
        }

        try {
          // 获取图片信息
          const imageInfo = await getImageInfo(file);
          
          // 压缩图片
          const compressedImage = await compressImage(file, {
            maxWidth: finalConfig.maxWidth,
            maxHeight: finalConfig.maxHeight,
            quality: finalConfig.quality,
            format: 'image/jpeg'
          });

          processedImages.push({
            id: Date.now() + i,
            url: compressedImage,
            file: file,
            type: 'uploaded',
            info: imageInfo
          });
        } catch (error) {
          console.error(`处理图片 ${file.name} 失败:`, error);
          showMessage('error', `处理图片 ${file.name} 失败`);
        }
      }

      if (processedImages.length > 0) {
        const newImages = [...images, ...processedImages];
        setImages(newImages);
        onImagesChange?.(newImages);
        showMessage('success', `成功处理${processedImages.length}张图片`);
      }
    } catch (error) {
      console.error('文件处理失败:', error);
      showMessage('error', '文件处理失败');
    } finally {
      setUploading(false);
      // 清空input值，允许重复选择同一文件
      event.target.value = '';
    }
  };

  // 删除图片
  const handleDeleteImage = (imageId) => {
    const newImages = images.filter(img => img.id !== imageId);
    setImages(newImages);
    onImagesChange?.(newImages);
    showMessage('success', '图片已删除');
  };

  // 选择预设图片
  const handleSelectPreset = (imageUrl) => {
    const newImage = {
      id: Date.now(),
      url: imageUrl,
      type: 'preset'
    };
    
    if (uploadType === 'avatar') {
      // 头像模式只保留一张
      setImages([newImage]);
      onImagesChange?.([newImage]);
      showMessage('success', '头像设置成功！');
      onClose?.();
    } else {
      // 其他模式添加到列表
      if (images.length >= finalConfig.maxCount) {
        showMessage('error', `最多只能选择${finalConfig.maxCount}张图片`);
        return;
      }
      const newImages = [...images, newImage];
      setImages(newImages);
      onImagesChange?.(newImages);
      showMessage('success', '图片添加成功！');
    }
  };

  // 选择已上传图片（头像模式）
  const handleSelectImage = (image) => {
    if (uploadType === 'avatar') {
      onImagesChange?.([image]);
      showMessage('success', '头像设置成功！');
      onClose?.();
    }
  };

  // 打开文件选择
  const triggerFileSelect = () => {
    uploadRef.current?.click();
  };

  // 渲染上传内容
  const renderUploadContent = () => (
    <div className={styles.container}>
      {/* 消息提示区域 */}
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      
      {/* 上传区域 */}
      <div className={styles.uploadSection}>
        <div className={styles.sectionTitle}>
          <PhotoO className={styles.sectionIcon} />
          <span>上传图片</span>
          {uploading && <Loading size="14px" className={styles.loadingIcon} />}
        </div>
        
        <div className={styles.uploadArea}>
          <input
            ref={uploadRef}
            type="file"
            accept={finalConfig.accept}
            multiple={finalConfig.multiple}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          
          <button 
            className={styles.uploadButton} 
            onClick={triggerFileSelect}
            type="button"
            disabled={uploading || images.length >= finalConfig.maxCount}
            aria-label="选择图片上传"
          >
            <AddO className={styles.uploadIcon} aria-hidden="true" />
            <span>选择图片</span>
          </button>
          
          <div className={styles.uploadTip}>
            支持jpg、png格式，单张图片不超过{Math.round(finalConfig.maxSize / 1024 / 1024)}MB
            {finalConfig.multiple && `，最多${finalConfig.maxCount}张`}
          </div>
        </div>

        {/* 已上传图片预览 */}
        {images.length > 0 && (
          <div className={styles.uploadedGrid}>
            {images.map((image) => (
              <div key={image.id} className={styles.imageItem}>
                <Image
                  src={image.url}
                  width="60px"
                  height="60px"
                  fit="cover"
                  round={uploadType === 'avatar'}
                  onClick={() => handleSelectImage(image)}
                  className={styles.uploadedImage}
                />
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDeleteImage(image.id)}
                  type="button"
                  aria-label="删除此图片"
                >
                  <DeleteO size="12px" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 预设图片（仅头像类型显示） */}
      {finalConfig.showPresets && (
        <div className={styles.presetSection}>
          <div className={styles.sectionTitle}>
            <Edit className={styles.sectionIcon} />
            <span>预设头像</span>
          </div>
          
          <div className={styles.presetGrid}>
            {presetAvatars.map((avatar, index) => (
              <div key={index} className={styles.imageItem}>
                <Image
                  src={avatar}
                  width="60px" 
                  height="60px"
                  fit="cover"
                  round
                  onClick={() => handleSelectPreset(avatar)}
                  className={styles.presetImage}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // 根据模式渲染不同的容器
  if (mode === 'inline') {
    return renderUploadContent();
  }

  // 弹窗模式
  return (
    <ActionSheet
      visible={visible}
      title={finalConfig.title}
      description={finalConfig.description}
      onCancel={onClose}
      cancelText="取消"
      className={styles.actionSheet}
    >
      {renderUploadContent()}
    </ActionSheet>
  );
};

export default UniversalImageUpload;