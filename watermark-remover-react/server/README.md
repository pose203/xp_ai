# 无水印视频解析后端服务

这是一个基于 Node.js + Express 的后端服务，集成了 [apia.vip](https://apia.vip) 的真实解析API。

## 🚀 快速开始

### 1. 安装依赖
```bash
cd server
npm install
```

### 2. 启动服务
```bash
# 开发模式
npm run dev

# 生产模式
npm start

# Windows 用户可以双击 start.bat
```

### 3. 验证服务
- API地址: http://localhost:3001/api/parse/content
- 健康检查: http://localhost:3001/api/health

## 📡 API 接口

### POST /api/parse/content
解析视频链接，获取无水印内容

**请求参数:**
```json
{
  "url": "https://v.douyin.com/xxxxx"
}
```

**响应格式:**
```json
{
  "success": true,
  "message": "解析成功",
  "data": {
    "title": "视频标题",
    "author": "作者名称",
    "downloadUrl": "无水印视频链接",
    "coverUrl": "封面图片链接",
    "duration": "视频时长",
    "platform": "平台名称",
    "isDemo": false,
    "originalUrl": "原始链接",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/health
健康检查接口

## 🔧 配置说明

### 环境变量 (.env)
```env
PORT=3001
APIA_API_KEY=329D8FDBADD4453C2AF7A9C3059549F9A932D1B766504AB8F7
APIA_USER_ID=202037297
APIA_BASE_URL=https://apia.vip/api/dsp
NODE_ENV=development
REQUEST_TIMEOUT=30000
```

### 支持的平台
- 抖音 (douyin.com, v.douyin.com)
- 快手 (kuaishou.com, v.kuaishou.com)
- 小红书 (xiaohongshu.com, xhslink.com)
- 微博 (weibo.com, m.weibo.cn)
- B站 (bilibili.com)

## 🛡️ 错误处理

当 apia.vip API 调用失败时，服务会自动降级到演示模式，确保前端功能正常运行。

## 🔄 部署说明

### 开发环境
```bash
npm run dev  # 使用 nodemon 自动重启
```

### 生产环境
```bash
npm start    # 直接启动服务
```

### PM2 部署
```bash
npm install pm2 -g
pm2 start server.js --name "watermark-api"
pm2 save
pm2 startup
```

## 📝 日志

服务运行时会在控制台输出详细的请求和响应日志，便于调试。

## 🤝 集成说明

这个后端服务专为前端 React 应用设计，完全兼容现有的前端代码结构。前端只需要将 API 基础地址指向 `http://localhost:3001/api` 即可。
