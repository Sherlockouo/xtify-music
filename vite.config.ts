import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'
import { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import filenamesToType from './vitePluginFilenamesToType'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  resolve: {
    alias: {
      '@':join(__dirname,'./src'),
      'hls.js': 'hls.js/dist/hls.min.js',
    }
  },
  plugins: [
    react(),
    filenamesToType([
      {
        dictionary: './src/assets/icons',
        typeFile: './src/components/Icon/iconNamesType.ts',
      },
    ]),
    /**
     * @see https://github.com/vbenjs/vite-plugin-svg-icons
     */
    createSvgIconsPlugin({
      iconDirs: [join(__dirname, './src/assets/icons')],
      symbolId: 'icon-[name]',
    }),
  ],
  build: {
    target: 'esnext',
    sourcemap: true,
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      plugins: [
      ],
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    proxy: {
      '/netease/': {
        target: `http://127.0.0.1:35530`,
        changeOrigin: true,
        // rewrite: path => (IS_ELECTRON ? path : path.replace(/^\/netease/, '')),
        // rewrite: path => (path ),
      },
      '/r3playx/': {
        target: `http://127.0.0.1:35530`,
        changeOrigin: true,
      },
    },
  }
}));
