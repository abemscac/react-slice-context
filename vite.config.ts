import typescript from '@rollup/plugin-typescript'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), typescript()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'react-slice-context',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})
