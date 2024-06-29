<template>
    <el-upload
      v-model:file-list="porps.fileList"
      :action="uploadUrl"
      list-type="picture-card"
      :on-success="success"
      :on-remove="handleRemove"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
  
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Plus } from '@element-plus/icons-vue'
  import { uploadUrl,host } from "@/api/produce";
  // 向父组件 传递
  const emit = defineEmits(["sendImg"]);
  // 父组件 给本组件
  const porps = defineProps(['fileList'])

  
  // const fileList = ref([
  //   // {
  //   //   name: 'food.jpeg',
  //   //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  //   // },
    
  // ])
  
  const handleRemove= (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
  }
  
  const success= (response) => {
    console.log("response",response);
    console.log('fileList',fileList.value);
    //需要获取正确的网址 访问这个图片  发送给添加商品接口 img地址
    let url = host+'/'+ response.url.slice(7);
    console.log(url);
    emit('sendImg',url);
  }
  </script>