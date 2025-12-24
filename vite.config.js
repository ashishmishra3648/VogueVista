import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Ignore the massive images folder to speed up startup
      ignored: ['**/public/images/**']
    }
  }
})
