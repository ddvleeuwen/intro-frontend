import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createRoutedSitemap } from "./vite/sitemap.vite";
import { createSEOTags } from "./vite/seo.vite";

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createRoutedSitemap(),
    createSEOTags(),
  ],
  build: {
    outDir: 'dist'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js' ]
  },
  server: {
    proxy: {
      '/api': isProduction ? 'https://intro.svindicium.nl' : 'http://localhost:3080'
    }
  }
})
