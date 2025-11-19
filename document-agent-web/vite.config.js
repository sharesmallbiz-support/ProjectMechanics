import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      providerImportSource: "@mdx-js/react"
    }) },
    react()
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Azure App Service configuration
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'markdown': ['gray-matter']
        }
      }
    }
  }
})
