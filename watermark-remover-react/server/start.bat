@echo off
echo 🚀 启动无水印视频解析后端服务...
echo.

REM 检查是否安装了Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到Node.js，请先安装Node.js
    pause
    exit /b 1
)

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo 📦 正在安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
)

echo ✅ 启动服务器...
echo 📡 API地址: http://localhost:3001/api/parse/content
echo 🔍 健康检查: http://localhost:3001/api/health
echo.
echo 按 Ctrl+C 停止服务器
echo.

npm start
pause
