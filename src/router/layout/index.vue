<template>
   
    <div class="skeleton" v-if="isLoading"><Skeleton></Skeleton></div>
    <div v-else>
        <div class="Menu"><Menu></menu></div>
        <div class="Content"> <Content></Content></div>
    </div>

</template>

<script setup >
    import Menu from '../menu/menu.vue'
    import Content from '../content/content.vue'
    import Skeleton from '../content/skeleton.vue'

    import { onMounted,ref } from "vue";

    const isLoading = ref(true); 
    // 组件挂载完毕 但是数据还没有更新（没有数据库数据）
    onMounted(()=>{
        console.log("chenggong2------------------------------------");
        isLoading.value = false;
    })
</script>

<style scoped>
    .Menu{ 
        width: 200px;
        position: fixed;
        top:0;
        left: 0;
        bottom: 0;
        background-color:#112f50;
    }
    .Content {
        padding-left: 200px;
    }
</style>
