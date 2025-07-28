// Token相关操作
const TokenKey = 'juejin_token';

// 获取token
export function getToken() {
  return localStorage.getItem(TokenKey);
}

// 设置token
export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

// 移除token
export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

// 解析JWT Token（不需要后端验证的简单解析）
export function parseToken(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token解析失败', error);
    return null;
  }
}

// 检查token是否过期
export function isTokenExpired() {
  const token = getToken();
  if (!token) return true;
  
  const decodedToken = parseToken(token);
  if (!decodedToken) return true;
  
  // 检查是否有过期时间
  if (!decodedToken.exp) return false;
  
  // 当前时间是否超过过期时间
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
} 