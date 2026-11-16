import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        fr: resolve(__dirname, 'fr/index.html'),
        frAbout: resolve(__dirname, 'fr/about.html'),
      },
    },
  },
})
