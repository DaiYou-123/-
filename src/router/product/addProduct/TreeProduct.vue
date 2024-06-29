<template>
    <el-tree :props="props" :load="loadNode" lazy @current-change="currentChange" />
</template>

<script setup>
import { reactive } from 'vue'
import { getSelectItemCategoryByParentId } from "@/api/produce.js";
const emit = defineEmits(['getTreeData'])
//使用api 
const props = reactive({
    label: 'name',
    children: 'zones',
    isLeaf: 'leaf',
})
//懒加载load节点的方法----------进入直接执行 等级 node.level==0 
const loadNode = async (node, resolve) => {
    if (node.level === 0) {
        let res = await getSelectItemCategoryByParentId()
        console.log('懒加载load节点---', res.data);
        if (res.data.status == 200) {
            return resolve(res.data.result)
        } else {
            return resolve([])
        }
    }
    if (node.level >= 1) {
        let res = await getSelectItemCategoryByParentId({ type: node.data.cid })
        if (res.data.status == 200) {
            return resolve(res.data.result)
        } else {
            return resolve([])
        }
    }
}

//点击tree-发送点击的数据----------------
const currentChange = (data) => {
    console.log('data', data);
    emit('getTreeData',data)
}



</script>

<style></style>