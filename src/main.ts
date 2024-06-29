
import { createApp , provide} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import './assets/css/base.css'

// import * as echarts from 'echarts'
// // 导入接口---挂全局---
// import api from './api';
const pinia = createPinia()

const app = createApp(App)
// // provide inject 提供一个值，可以在应用中的所有后代组件中注入使用
// provide('api',api)

app.use(createPinia())
app.use(router)
// app.use(ElementPlus)

import locale from "element-plus/es/locale/lang/zh-cn";//需要新加的代码
app.use(ElementPlus, {locale});//需要改变的地方，加入locale（中文包）
// app.config.globalProperties.$echarts = echarts
// app.use(pinia)

app.mount('#app')
