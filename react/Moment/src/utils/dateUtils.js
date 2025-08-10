/**
 * 日期和时间工具函数
 */

/**
 * 格式化相对时间
 * @param {string|Date} timeStr - 时间字符串或Date对象
 * @returns {string} 格式化后的时间字符串
 */
export const formatRelativeTime = (timeStr) => {
  const time = new Date(timeStr);
  const now = new Date();
  const diff = now - time;
  
  // 小于1分钟显示"刚刚"
  if (diff < 60 * 1000) {
    return '刚刚';
  }
  
  // 小于1小时显示分钟
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes}分钟前`;
  }
  
  // 小于24小时显示小时
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours}小时前`;
  }
  
  // 大于24小时显示日期
  return time.toLocaleDateString();
};

/**
 * 格式化日期
 * @param {string|Date} date - 日期
 * @param {string} format - 格式模板
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
};

/**
 * 检查是否为今天
 * @param {string|Date} date - 日期
 * @returns {boolean} 是否为今天
 */
export const isToday = (date) => {
  const today = new Date();
  const targetDate = new Date(date);
  
  return today.toDateString() === targetDate.toDateString();
};

/**
 * 检查是否为昨天
 * @param {string|Date} date - 日期
 * @returns {boolean} 是否为昨天
 */
export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const targetDate = new Date(date);
  
  return yesterday.toDateString() === targetDate.toDateString();
};

export default {
  formatRelativeTime,
  formatDate,
  isToday,
  isYesterday
};