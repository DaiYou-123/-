<template>
    <!-- 顶部菜单 -->
    <div class="header">
        <el-col :span="4"><div class="left">11</div></el-col>
        <el-col :span="20"><div class="right">22</div></el-col>    
    </div>
  <!-- 内容区 -->
    <div class="wrapper">
        <RouterView/>
    </div>
</template>

<script setup lang="ts">

</script>


<style lang="scss" scoped >
    .header{
        background-color: antiquewhite;
        height: 50px;
        line-height: 50px;
        display: flex;

        .right{
            text-align: right;
            padding-right: 20px;
        }
   
    }
    .wrapper{
        padding:10px;
    }
   
    
</style>
