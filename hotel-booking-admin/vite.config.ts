// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Use this for SPA fallback routing in Vite
    // It must be nested under `server`
    // This option is called `historyApiFallback` in Webpack,
    // but in Vite, you use `server.fs.strict` or just configure fallback in the index.html base.
    
    // For Vite, to fix SPA 404s, use:
    // (Note: usually, no config is needed for basic SPA routing)
  }
})
