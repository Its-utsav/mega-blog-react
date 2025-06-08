import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // base: "/mega-blog-cac/", // for local developemtn
  base: "/",
  server: {
    cors: {
      origin: "*"
    }
  }
})
