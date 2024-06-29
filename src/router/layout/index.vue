<template>
    <div class="Menu"><Menu></menu></div>
    <div class="Content"><Content></Content></div>
</template>

<script setup lang="ts">
    import Menu from '../menu/menu.vue'
    import Content from '../content/content.vue'
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
