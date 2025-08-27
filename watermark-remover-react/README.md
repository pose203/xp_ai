# 去水印神器 - React版本

一款基于React开发的多平台视频图片去水印工具，支持抖音、快手、小红书等主流平台。

## 功能特点

- 🚀 **多平台支持** - 支持抖音、快手、小红书、微博等主流平台
- 🎯 **极速解析** - 秒级完成视频和图片的去水印处理
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🔄 **批量处理** - 支持批量解析用户主页所有内容
- 🎨 **现代UI** - 基于Ant Design的精美界面
- 🛡️ **安全可靠** - 无需登录，不存储用户数据

## 技术栈

- **前端框架**: React 18
- **UI组件库**: Ant Design
- **路由管理**: React Router DOM
- **状态管理**: React Hooks
- **样式方案**: Styled Components + CSS
- **HTTP客户端**: Axios
- **构建工具**: Create React App

## 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0 或 yarn >= 1.22.0

### 安装依赖

\`\`\`bash
# 使用npm
npm install

# 或使用yarn
yarn install
\`\`\`

### 启动开发服务器

\`\`\`bash
# 使用npm
npm start

# 或使用yarn
yarn start
\`\`\`

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本

\`\`\`bash
# 使用npm
npm run build

# 或使用yarn
yarn build
\`\`\`

构建后的文件将在 \`build\` 目录中。

## 项目结构

\`\`\`
src/
├── components/          # 公共组件
│   └── Layout/         # 布局组件
├── pages/              # 页面组件
│   ├── Home.js         # 首页
│   ├── Tools.js        # 工具页
│   ├── Tasks.js        # 任务页
│   ├── Profile.js      # 个人中心
│   ├── BatchParser.js  # 批量解析
│   ├── Instructions.js # 使用教程
│   └── About.js        # 关于我们
├── services/           # API服务
│   └── api.js         # API封装
├── utils/              # 工具函数
│   └── helper.js      # 辅助函数
├── App.js             # 应用入口
├── App.css            # 应用样式
├── index.js           # 应用启动
└── index.css          # 全局样式
\`\`\`

## 主要功能

### 1. 视频解析
- 支持主流平台视频链接解析
- 自动识别平台类型
- 保持原始画质
- 一键下载

### 2. 批量处理
- 用户主页批量解析
- 多线程并发处理
- 进度实时显示
- 批量下载

### 3. 任务系统
- 每日签到奖励
- 分享获得金币
- 邀请好友奖励
- 观看广告奖励

### 4. 用户中心
- 个人信息管理
- 解析历史记录
- 数据统计展示
- 设置与帮助

## API接口

应用需要后端API支持，主要接口包括：

- \`POST /api/parse/content\` - 解析单个链接
- \`POST /api/parse/batch\` - 批量解析
- \`GET /api/user/detail\` - 获取用户信息
- \`POST /api/user/tasks\` - 任务相关接口
- \`GET /api/system/config\` - 系统配置

详细的API文档请参考后端项目说明。

## 环境变量

复制 \`.env.example\` 为 \`.env\` 并配置以下变量：

\`\`\`env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_APP_NAME=去水印神器
REACT_APP_APP_VERSION=1.0.0
\`\`\`

## 部署说明

### 1. 构建项目

\`\`\`bash
npm run build
\`\`\`

### 2. 部署到服务器

将 \`build\` 目录的内容部署到Web服务器（如Nginx、Apache）。

### 3. Nginx配置示例

\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /var/www/watermark-remover;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
\`\`\`

## 开发说明

### 代码规范

- 使用ES6+语法
- 组件采用函数式组件 + Hooks
- 样式使用Styled Components
- 遵循React最佳实践

### 提交规范

\`\`\`
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建或配置相关
\`\`\`

## 许可证

本项目仅供学习交流使用，请勿用于商业用途。

## 联系我们

如有问题或建议，请通过以下方式联系：

- 邮箱: support@example.com
- 微信客服: 见应用内联系方式

---

**注意**: 本工具仅供个人学习交流使用，请勿用于商业用途。解析的内容版权归原作者所有，请尊重原创者的劳动成果。
