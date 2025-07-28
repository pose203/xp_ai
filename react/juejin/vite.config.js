import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssPluginPxtorem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]_[hash:base64:5]',
    },
    postcss: {
      plugins: [
        postcssPluginPxtorem({
          rootValue: 37.5,
          propList: ['*'],
          selectorBlackList: ['.norem'],
        })
      ]
    }
  }
})
