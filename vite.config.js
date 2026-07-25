import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages는 https://<user>.github.io/suhyun-invitation/ 경로로 서빙되므로 base 필수
export default defineConfig({
  base: '/suhyun-invitation/',
  plugins: [react()],
})
