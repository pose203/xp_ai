/**
 * 图片处理工具 - 压缩、裁剪、优化
 */

/**
 * 压缩图片
 * @param {File} file - 原始图片文件
 * @param {Object} options - 压缩选项
 * @returns {Promise<string>} - 压缩后的base64图片
 */
export const compressImage = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const {
      maxWidth = 256,
      maxHeight = 256,
      quality = 0.8,
      format = 'image/jpeg'
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  const img = new window.Image();

    img.onload = () => {
      // 计算压缩后的尺寸
      let { width, height } = img;
      
      // 保持宽高比
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // 清空画布并绘制图片
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // 转换为base64
      const compressedDataUrl = canvas.toDataURL(format, quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * 裁剪图片为圆形头像
 * @param {string} imageUrl - 图片URL
 * @param {number} size - 输出尺寸
 * @returns {Promise<string>} - 裁剪后的base64图片
 */
export const cropToCircle = (imageUrl, size = 256) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  const img = new window.Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;

      // 创建圆形裁剪路径
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // 计算图片居中位置
      const { width, height } = img;
      let sx = 0, sy = 0, sWidth = width, sHeight = height;
      
      // 裁剪为正方形（取中心部分）
      if (width > height) {
        sx = (width - height) / 2;
        sWidth = height;
      } else if (height > width) {
        sy = (height - width) / 2;
        sHeight = width;
      }

      // 绘制图片
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, size, size);

      const circleDataUrl = canvas.toDataURL('image/png', 0.9);
      resolve(circleDataUrl);
    };

    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };

    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
  });
};

/**
 * 生成多种尺寸的头像
 * @param {string} imageUrl - 原始图片URL
 * @returns {Promise<Object>} - 包含不同尺寸头像的对象
 */
export const generateAvatarSizes = async (imageUrl) => {
  try {
    const [small, medium, large] = await Promise.all([
      cropToCircle(imageUrl, 64),   // 小头像：64x64
      cropToCircle(imageUrl, 128),  // 中头像：128x128  
      cropToCircle(imageUrl, 256)   // 大头像：256x256
    ]);

    return {
      small,
      medium,
      large,
      original: imageUrl
    };
  } catch (error) {
    console.error('生成头像尺寸失败:', error);
    throw error;
  }
};

/**
 * 验证图片文件
 * @param {File} file - 文件对象
 * @returns {Object} - 验证结果
 */
export const validateImageFile = (file) => {
  const result = {
    valid: true,
    errors: []
  };

  // 检查文件类型
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    result.valid = false;
    result.errors.push('不支持的文件格式，请选择 JPG、PNG 或 WebP 图片');
  }

  // 检查文件大小（5MB限制）
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    result.valid = false;
    result.errors.push('图片大小不能超过5MB');
  }

  // 检查文件大小（最小10KB）
  const minSize = 10 * 1024;
  if (file.size < minSize) {
    result.valid = false;
    result.errors.push('图片文件太小，请选择更大的图片');
  }

  return result;
};

/**
 * 从文件获取图片信息
 * @param {File} file - 图片文件
 * @returns {Promise<Object>} - 图片信息
 */
export const getImageInfo = (file) => {
  return new Promise((resolve, reject) => {
  const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const info = {
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
        type: file.type,
        name: file.name,
        aspectRatio: img.naturalWidth / img.naturalHeight
      };
      URL.revokeObjectURL(url);
      resolve(info);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('无法获取图片信息'));
    };

    img.src = url;
  });
};

/**
 * 将base64转换为Blob对象
 * @param {string} base64 - base64字符串
 * @returns {Blob} - Blob对象
 */
export const base64ToBlob = (base64) => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};

/**
 * 下载图片
 * @param {string} dataUrl - 图片数据URL
 * @param {string} filename - 文件名
 */
export const downloadImage = (dataUrl, filename = 'avatar.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};