import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite' // element 按需 引入vite按需插件
import Components from 'unplugin-vue-components/vite' 
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // 行代码导入了unplugin-vue-components插件提供的ElementPlusResolver。这个解析器可以帮助插件识别Element Plus组件库中的组件。
import { visualizer } from 'rollup-plugin-visualizer'; // 打包后参看各文件体积的依赖
import viteCompression from 'vite-plugin-compression' // 静态资源打包压缩

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ //
      resolvers: [ElementPlusResolver()], // 
    }),
    Components({
      resolvers: [ElementPlusResolver()], //
    }),
    visualizer(),
    // 在plugins配置数组里添加gzip插件
    viteCompression({
      verbose: true, // 默认即可
      disable: false, // 开启压缩(不禁用)，默认即可
      deleteOriginFile: false, // 删除源文件
      threshold: 5120, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz' // 文件类型
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:6688',//
        ws: true,
        changeOrigin: true,
        // pathRewrite:{//重写路径
        //     '^/api':''
        // }
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      treeshake: true, // 开启 Tree Shaking，消除未使用的代码，减小最终的包大小
      output: { // 资源分包
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称 name输出名字 hash内容的哈希值
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称 
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等 ext-表示文件扩展名

        manualChunks(id) {
          if (id.includes('node_modules')) {
            //使用pnpm打包
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      }
    }
  }

})
