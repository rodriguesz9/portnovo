import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import siteMetadata from './build/site-metadata.mjs'
import process from 'node:process'

// https://vite.dev/config/
const isVercelProduction = process.env.VERCEL_ENV === 'production'
const metadataEnv = {
  SITE_MODE: isVercelProduction ? 'production' : process.env.SITE_MODE,
  SITE_URL: isVercelProduction ? 'https://robertrodrigues.vercel.app' : process.env.SITE_URL,
}

export default defineConfig({
  plugins: [react(), siteMetadata(metadataEnv)],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
