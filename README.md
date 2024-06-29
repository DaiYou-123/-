## 项目介绍

## 安装element-plus
 1.npm install element-plus --save
 2.引入
    1.全导入
        // main.ts
        import { createApp } from 'vue'
        import ElementPlus from 'element-plus'
        import 'element-plus/dist/index.css'
        import App from './App.vue'

        const app = createApp(App)

        app.use(ElementPlus)
        app.mount('#app')

## 安装依赖
npm i normalize.css -S
npm i axios -S  npm i querystring -S
npm i echars -S
    按需导入
    import * as echarts from 'echarts/core';
