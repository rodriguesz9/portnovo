import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import siteMetadata from './build/site-metadata.mjs'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteMetadata({ SITE_MODE: process.env.SITE_MODE, SITE_URL: process.env.SITE_URL })],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
