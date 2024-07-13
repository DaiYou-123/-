// skeleton.entry.js
import Vue from 'vue'
import Skeleton from './skeleton.vue'

export default new Vue({
  // 根实例简单的渲染应用程序组件
  render: h => h(Skeleton)  // 这是 Vue.js 的渲染函数，它告诉 Vue 实例要渲染哪个组件。Vue 实例会渲染 Skeleton 组件。
})
