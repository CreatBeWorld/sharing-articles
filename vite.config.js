import { defineConfig } from 'vite'
/* 安装@dcloudio/vite-plugin-uni会报错，不要安装 */
import uni from '@dcloudio/vite-plugin-uni'
import h5ProdEffectPlugin from 'uni-vite-plugin-h5-prod-effect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // 对h5 production环境打包时的特殊处理，否则uni-crazy-router在这个环境会异常
    h5ProdEffectPlugin()
  ],
})