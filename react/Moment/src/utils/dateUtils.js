/** 日期和时间工具函数 */
export const formatRelativeTime = (timeStr) => {
  const time = new Date(timeStr);
  const now = new Date();
  const diff = now - time;
  if (diff < 60 * 1000) return '刚刚';
  if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}分钟前`;
  if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}小时前`;
  return time.toLocaleDateString();
};

export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return format.replace('YYYY', year).replace('MM', month).replace('DD', day).replace('HH', hours).replace('mm', minutes);
};

export const isToday = (date) => {
  const today = new Date();
  const targetDate = new Date(date);
  return today.toDateString() === targetDate.toDateString();
};

export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const targetDate = new Date(date);
  return yesterday.toDateString() === targetDate.toDateString();
};

export default { formatRelativeTime, formatDate, isToday, isYesterday };