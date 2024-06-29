<template>
 <el-menu
        active-text-color="#ffd04b"
        background-color="#112f50"
        class="el-menu-vertical-demo"
        :default-active="$router.currentRoute.value.meta.activeMenu || $router.currentRoute.value.path" router=true
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
      <el-menu-item index="">
          <span>后台管理系统</span>
        </el-menu-item>

        <el-menu-item index="/">
          <el-icon><icon-menu /></el-icon>
          <span>首页</span>
        </el-menu-item>

        <el-sub-menu index="/product">
          <template #title>
            <el-icon><location /></el-icon>
            <span>产品管理</span>
          </template>
    
            <el-menu-item index="/product/list">产品列表</el-menu-item>
            <el-menu-item index="/product/category">产品分类</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="/order">
          <template #title>
            <el-icon><location /></el-icon>
            <span>订单管理</span>
          </template>
    
            <el-menu-item index="/order/order-list">订单列表</el-menu-item>
            <el-menu-item index="/order/collect">汇总清单</el-menu-item>
            <el-menu-item index="1-3">订单审核</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>广告管理</span>
          </template>
    
            <el-menu-item index="1-1">广告列表</el-menu-item>
            <el-menu-item index="1-2">广告清单</el-menu-item>
            <el-menu-item index="1-3">广告审核</el-menu-item>
        </el-sub-menu>
        
      </el-menu>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
</script>

<style scoped>
  .el-menu  {
    border-right: none;
  }
  .el-menu .is-active{
    background: #1e78bf;
    color: #fff;
  }

</style>
