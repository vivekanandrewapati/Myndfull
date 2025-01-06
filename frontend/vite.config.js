import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/preact/compat'),
      'react-dom': path.resolve(__dirname, './node_modules/preact/compat')
    }
  }
})
