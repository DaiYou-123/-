import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../router/layout/index.vue';
import Login from './login/login.vue';
import Home from './home/home.vue';

import useLoginStore from '@/stores/login';
console.log('ceshi-----------',useLoginStore);

// //获取仓库的方法 --- 
// const store = useLoginStore(); //!!!!调用显示pinia未创建
// const {token} = store;

// 懒加载 产品列表
const Product = () => import('../router/product/index.vue')
const List = () => import('../router/product/list/list.vue')
const Category = () => import('../router/product/category/category.vue')
const AddProduct = () => import('../router/product/addProduct/AddProduct.vue')


// 懒加载 订单管理
const Order = () => import('../router/order/index.vue')
const OrderList = () => import('../router/order/list/list.vue')
const OrderCollect = () => import('../router/order/collect/collect.vue')


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      meta: {
        // isLogin:true // Layout 下的子集必须登录才能使用
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
          meta: {
            title: '首页'
          }
        },
        {
          path: '/order',
          name: 'order',
          component: Order,
          meta: {
            title: '订单管理'
          },
          children: [
            {
              path: 'order-list',
              name: 'order-list',
              component: OrderList,
              meta: {
                title: '订单列表'
              },
            },
            {
              path: 'collect',
              name: 'collect',
              component: OrderCollect,
              meta: {
                title: '汇总订单'
              },
            }
          ]
        },
        {
          path: '/product',
          name: 'product',
          component: Product,
          meta:{
            title:"产品管理",
          },
          children: [
            {
              path: 'list',
              name: 'list',
              component: List,
              meta:{
                title:"产品列表",
              },
            },
            {
              path: 'category',
              name: 'category',
              component: Category,
              meta:{
                title:"产品分类",
              },
            },
            {
              path: 'addProduct',
              name: 'addProduct',
              component: AddProduct,
              meta: {
                activeMenu: '/product/list',
                title: '产品操作'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// // 配置路由全局前置守卫
// router.beforeEach((to,from,next) =>{
//   // 判断进入页面的路由是否需要登录
//   if(to.matched.some(record => record.meta.requiresAuth)){
//     // 需要验证登录
//     if(token){
//       next()
//     }
//     else{
//       next('/login')
//     }

//   }
//   else {
//     // 不需要
//     next()
//   }
// })


export default router


