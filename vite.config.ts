import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 同一ネットワークの実機（iOS / Android）からも確認できるようにする
    host: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // 自前の CSS Modules だけを処理する（Swiper などの外部 CSS は jsdom が解析できず警告が出るため）
    css: { include: /\.module\.scss$/ },
  },
})
