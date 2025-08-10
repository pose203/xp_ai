import { useState, useCallback, useMemo } from 'react';

/**
 * 图片上传Hook
 * @param {Object} options 配置选项
 * @param {Array} options.initialImages 初始图片列表
 * @param {number} options.maxCount 最大图片数量
 * @param {Function} options.onUploadSuccess 上传成功回调
 * @param {Function} options.onUploadError 上传失败回调
 */
export const useImageUpload = (options = {}) => {
  const {
    initialImages = [],
    maxCount = 9,
    onUploadSuccess
  } = options;

  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  // 添加图片
  const addImages = useCallback((newImages) => {
    setImages(prev => {
      const combined = [...prev, ...newImages];
      return combined.slice(0, maxCount);
    });
  }, [maxCount]);

  // 删除图片
  const removeImage = useCallback((imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  }, []);

  // 清空图片
  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  // 更新图片列表
  const updateImages = useCallback((newImages) => {
    setImages(newImages);
  }, []);

  // 设置上传状态
  const setUploadStatus = useCallback((status) => {
    setUploading(status);
  }, []);

  // 显示上传组件
  const openUpload = useCallback(() => {
    setShowUpload(true);
  }, []);

  // 隐藏上传组件
  const closeUpload = useCallback(() => {
    setShowUpload(false);
  }, []);

  // 处理图片变化
  const handleImagesChange = useCallback((newImages) => {
    updateImages(newImages);
    if (onUploadSuccess) {
      onUploadSuccess(newImages);
    }
  }, [updateImages, onUploadSuccess]);

  // 获取当前状态
  const canAddMore = images.length < maxCount;
  const isEmpty = images.length === 0;
  const isFull = images.length >= maxCount;

  return {
    // 状态
    images,
    uploading,
    showUpload,
    canAddMore,
    isEmpty,
    isFull,
    
    // 操作方法
    addImages,
    removeImage,
    clearImages,
    updateImages,
    setUploadStatus,
    openUpload,
    closeUpload,
    handleImagesChange,

    // 便捷方法
    getImageUrls: () => images.map(img => img.url),
    getImageCount: () => images.length,
    getFirstImage: () => images[0] || null
  };
};

/**
 * 头像上传Hook（基于useImageUpload的特化版本）
 * 优化版本：减少不必要的重渲染，提升性能
 */
export const useAvatarUpload = (initialAvatar = null) => {
  const [avatar, setAvatar] = useState(initialAvatar);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  // 使用防抖更新头像，避免频繁状态变更
  const updateAvatar = useCallback((newAvatar) => {
    // 只有当新头像与当前头像不同时才更新
    setAvatar(prevAvatar => {
      if (prevAvatar === newAvatar) {
        return prevAvatar; // 避免不必要的状态更新
      }
      return newAvatar;
    });
  }, []);

  const openAvatarUpload = useCallback(() => {
    setShowAvatarUpload(true);
  }, []);

  const closeAvatarUpload = useCallback(() => {
    setShowAvatarUpload(false);
  }, []);

  const handleAvatarChange = useCallback((images) => {
    if (images && images.length > 0) {
      updateAvatar(images[0].url);
    }
  }, [updateAvatar]);

  // 使用useMemo缓存计算值，避免重复计算
  const hasAvatar = useMemo(() => {
    return avatar != null && avatar !== '';
  }, [avatar]);

  return {
    avatar,
    showAvatarUpload,
    updateAvatar,
    openAvatarUpload,
    closeAvatarUpload,
    handleAvatarChange,
    hasAvatar
  };
};

/**
 * 图片预览Hook
 */
export const useImagePreview = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const openPreview = useCallback((imageUrl) => {
    setPreviewImage(imageUrl);
    setShowPreview(true);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewImage(null);
    setShowPreview(false);
  }, []);

  return {
    previewImage,
    showPreview,
    openPreview,
    closePreview
  };
};