<template>
    <el-row :gutter="20">
        <el-col :span="4">
            <div class="nav">
                <div class="title">产品类型列表</div>

                <div class="tree">
                    <TreeProduct @getTreeData="getTreeData"></TreeProduct>
                </div>
            </div>
        </el-col>
        <el-col :span="20">
            <div class="wrapper">
                <div class="my-title">商品{{ title }}</div>
                <!-- model 和 ref ref="ruleForm" 的值不能重名 -->
                <el-form :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="所属分类" prop="category">
                        <span>{{ ruleForm.category }}</span>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="title">
                        <el-input v-model="ruleForm.title" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="price">
                        <el-input v-model="ruleForm.price" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="num">
                        <el-input v-model="ruleForm.num" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="商品卖点" prop="sellPoint">
                        <el-input v-model="ruleForm.sellPoint" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" prop="image">
                        <!-- <UploadImg @sendImg="sendImg" ref="uploadImg" :fileList="fileList"></UploadImg> -->
                        <UploadImg @sendImg="sendImg" :fileList="fileList"></UploadImg>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="descs">
                        <!-- <WangEditor @sendWangEditor="sendWangEditor" ref="wangEditor"></WangEditor> -->
                        <WangEditor @sendWangEditor="sendWangEditor"></WangEditor>
                    </el-form-item>
                    <el-form-item label="首页轮播推进" prop="isShow">
                        <el-switch v-model="ruleForm.isShow" active-color="#13ce66"
                            inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label="是否推荐商品" prop="isShow">
                        <el-switch v-model="ruleForm.isShow" active-color="#13ce66"
                            inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label="是否上架商品" prop="isShow">
                        <el-switch v-model="ruleForm.isShow" active-color="#13ce66"
                            inactive-color="#ff4949"></el-switch>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button @click="closePage">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import { inject, onMounted, reactive, ref, toRefs, nextTick } from "vue";
import TreeProduct from './TreeProduct.vue';
import UploadImg from './UploadImg.vue';
import WangEditor from './WangEditor.vue';
import { getAddgoods } from "@/api/produce.js";
import { ElMessage } from 'element-plus'
import useGoodsStore from '@/stores/GoodsInfo'
import router from "@/router";

const fileList = ref([])

//获取仓库的方法 --- 
const store = useGoodsStore();
// console.log('store-----------------------------',store);
const {title,rowData} = store;


//表单数据

let ruleForm = reactive({
    id: '',
    title: '',
    num: '',
    price: '',
    sellPoint: '',
    image: [],
    descs: '',
    category: '',
    cid: '',
    isShow: true,
})

// 表单验证规则
const rules = reactive({
    title: [
        { required: true, message: '请输入商品名称', trigger: 'blur' },
        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    num: [
        { required: true, message: '请输入商品数量', trigger: 'blur' },
    ],
    price: [
        { required: true, message: '请输入商品价格', trigger: 'blur' },
    ],
    category: [{
        required: true, message: '请选择商品类目'
    }]
})
// 接收tree数据
const getTreeData = (val) => {
    console.log('val', val);
    ruleForm.cid = val.cid;
    ruleForm.category = val.name;
}

// 上传图片 接收图片地址
const sendImg = (val) => {
    ruleForm.image.push(val);
    // console.log('image',ruleForm.image);
}

// 接收 wangeditor数据
const sendWangEditor = (val) => {
    ruleForm.descs = val;
    // console.log('descs',ruleForm.descs);
}

// 点击保存---触发事件
const submitForm = async () => {
    // console.log('total',ruleForm);
    let { id, title, image, sellPoint, price, cid, category, num, descs } = ruleForm;
    let res = await getAddgoods({
        title, image: JSON.stringify(image), sellPoint, price, cid, category, num, descs
    })
    // console.log('total',res.data);
    // 弹窗
    if (res.data.status == 200) {
        ElMessage({
            message: '添加商品成功',
            type: 'success',
        })

        // 跳转路由
        console.log('router', router);
        router.push('/product/list');
        console.log('router', router);
    }
    
}

onMounted(()=>{
    // 编辑页面时
    if(title == "编辑" || store.title == '详情'){
        ruleForm = rowData;
        Object.assign(ruleForm, rowData)
    console.log('myform--------', ruleForm);
    let arr = JSON.parse(rowData.image)
    ruleForm.image = arr;
    //回片回显---需要一个数组容器装图片 --发送给子组件uploadImg
    let img = [];//fileList=[{name:'',url:''}]
    arr.forEach(ele => {
        let obj = {}
        obj.url = ele;
        img.push(obj)
    });
    fileList.value = img;

    }
})
</script>

<style lang="scss" scoped>
.nav {
    height: 600px;
    background: #fff;

    .title {
        background: skyblue;
        padding: 20px;
        color: #fff;
    }

    .tree {
        padding: 20px;
    }
}

.wrapper {
    // height: 800px;
    background: #fff;

    .my-title {
        background: #eee;
        padding: 14px;
        color: #333;
        font-weight: bold;
    }

    .demo-ruleForm {
        padding: 20px;
    }
}
</style>