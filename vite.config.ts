import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://agent200147.github.io/pizzasoft/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
