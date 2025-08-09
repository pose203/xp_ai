import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'
import pxtorem from 'postcss-pxtorem'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
      logger: true,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 37.5, // 设计稿宽度的1/10
          propList: ['*'], // 需要转换的属性，*表示所有属性
          selectorBlackList: ['.norem'], // 过滤掉不需要转换的类名
          minPixelValue: 2, // 小于2px的不会被转换
        })
      ]
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    proxy: {
      // 代理火山引擎图像生成API请求
      "/api/volces/images": {
        target: "https://ark.cn-beijing.volces.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/volces\/images/, "/api/v3/images/generations"),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            // 从加载的环境变量获取API密钥
            const apiKey = env.VITE_ARK_API_KEY;
            if (apiKey) {
              proxyReq.setHeader("Authorization", `Bearer ${apiKey}`);
            } else {
              // 给出轻量提示，不打印任何密钥或环境变量
              console.warn('VITE_ARK_API_KEY 未配置，图像生成代理将不可用');
            }
          });
        },
      }
    }
  }
  };
});
