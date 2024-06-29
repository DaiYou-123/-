import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../router/layout/index.vue';
import Login from './login/login.vue';
import Home from './home/home.vue';

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
          children: [
            {
              path: 'order-list',
              name: 'order-list',
              component: OrderList
            },
            {
              path: 'collect',
              name: 'collect',
              component: OrderCollect
            }
          ]
        },
        {
          path: '/product',
          name: 'product',
          component: Product,
          children: [
            {
              path: 'list',
              name: 'list',
              component: List,
            },
            {
              path: 'category',
              name: 'category',
              component: Category,
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

export default router


