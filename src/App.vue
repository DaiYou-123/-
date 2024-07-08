<template>
   <RouterView></RouterView>
</template>

<script setup >

import { RouterView } from 'vue-router'
import { ref,onMounted,defineAsyncComponent, onUpdated , onBeforeMount} from "vue";
// import Skeleton from './router/content/skeleton.vue'
// import Home from './router/home/home.vue'
// import Error from './router/content/error.vue'

const isloading = ref(false);


// const Home = () =>import('./router/home/home.vue')
// const Home = defineAsyncComponent({
//   loader: () => import('./router/home/home.vue'),
//   loadingComponent: Error,
//   delay: 200,
//   errorComponent: Error,
//   timeout: 3000,
// })


// function open(){
//   isloading.value = !isloading.value;
// }


</script>


<style scoped>

</style>
