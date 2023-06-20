import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default defineConfig({
  base: '/acid-jokes/',
  plugins: [react(), svgr()],
  "resolve": {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@/assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },

    ]
  },
  build: {
    outDir: 'dist',
  },
  publicDir: 'assets',
})
