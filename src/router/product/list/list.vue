<template>
  <div>


    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="产品名称">
            <el-input v-model="formInline.name"  placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker v-model="formInline.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toSearch">查询</el-button>
            <el-button type="primary" @click="toBack">返回首页</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <!-- <routerLink to="/product/addProduct">
          <el-button type="warning" :icon='Plus'>添加商品</el-button>
        </routerLink> -->
        <el-button type="warning" :icon='Plus' @click="toAddProduct">添加商品</el-button>
        <el-button type="danger" :icon="Delete">批量删除</el-button>
      </div>
    </div>

    <!-- 2. 产品列表 -->
    <!-- 
        el-table 表格组件
            :data="tableData"  注入data对象数组 [{},{}]
            stripe属性可以创建带斑马纹的表格
             border 边框
            
        el-table-column 表格列
            prop="date"   prop属性来对应对象中的键名即可填入数据
            label="日期"  label属性来定义表格的列名
            width属性来定义列宽
        event：
          select	当用户手动勾选数据行的 Checkbox 时触发的事件	selection, row
          select-all	当用户手动勾选全选 Checkbox 时触发的事件	selection
     -->
    <div class="content">
      <el-table :data="tableData" style="width: 100%;" border header-cell-class-name="active-header"
        cell-class-name="table-center">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="商品编号" width="120">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="120" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            <span style="color:blue;cursor: pointer;" >{{ scope.row.title }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="120">
        </el-table-column>
        <el-table-column prop="category" label="商品类目" width="120">
        </el-table-column>
        <el-table-column label="添加时间" prop="create_time">
          <template #default="scope">
            <span>{{ dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="商品描述" show-overflow-tooltip prop="descs">
          <template #default="scope">
            <span>{{ removeHTMLTag(scope.row.descs) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" :icon="Edit"  @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
            <el-button type="danger" :icon="Delete"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="page">
        <Pagination :total="total" :pageSize="pageSize" @getCurrentPage = "getCurrentPage"></Pagination>
      </div>
    </div>

  </div>
</template>

<script setup>
import {
  Check,
  Delete,
  Edit,
  Plus
} from '@element-plus/icons-vue'
import { inject, onMounted, ref } from "vue";
import { getprojectList,getsearch,getDeleteItemById } from "@/api/produce.js";
import dayjs from "dayjs";
// import { removeHTMLTag } from '@utils/common'
import { removeHTMLTag } from '@/utils/common'
import  Pagination  from "@/pagination/Pagination.vue";
import { ElMessage, ElMessageBox } from 'element-plus'
// import type { Action } from 'element-plus'
import useGoodsStore from '@/stores/GoodsInfo'
import router from "@/router";

//获取仓库的方法 --- 
const store = useGoodsStore();
// console.log('store-----------------------------',store);

// 搜索框对象
const formInline = ref({ name: '', date: '' })
// 表格数据
let tableData = ref([]);
// 分页数据
let total = ref(10);
let pageSize = ref(1);
let currentPage = ref(1);
// 获取页码数--点击后-----
const getCurrentPage=(val)=>{
  // console.log('页码--------',val);
  //存储当前的页码---目的：删除的时候 需要获取当前的页码数据----
  currentPage.value = val;
  getList(val);
}
//方法二 点击添加信息------触发
const toAddProduct=()=>{
  // 跳转路由
  router.push('/product/addProduct')
  store.setRowData({
    title:'添加',
    rowData:{}
  })
}
// 查询功能-----------------------------
const toSearch= async ()=>{
  // 先获取需要查询的数据 再调用相应的接口
    let res = await getsearch({search:formInline.value.name})
    // console.log('查询', res.data);
    if(res.data.status === 200){
      tableData.value = res.data.result;
      total.value = Math.ceil(res.data.result.length/pageSize.value);
  
    }else{
      tableData.value = [];
      total.value = [];
      pageSize.value = [];
    }
}
// toBack 搜索完 返回首页
//返回---获取第一页的数据-----------------------
const toBack = () => {
  //清空搜索表单 1. 手动清空表单对象数据 初始化  2. resetFields	重置该表单项，将其值重置为初始值，并移除校验结果
  //清空表单数据：如果定义的是reactive响应式的变量 需要打点出属性 单独清空 不能使用 resetFields();
  formInline.value.name = '';
  formInline.value.date = '';

  //清空表单数据：如果定义的是ref响应式的变量 使用 resetFields();
  // myForm.value.resetFields();
  getList();
}

const getList = async (page) => {
  let res = await getprojectList({ page })
  if (res.data.status === 200) {
    tableData.value = res.data.data;
    total.value = res.data.total;
    pageSize = res.data.pageSize;
  }
}

//编辑按钮--------------------------------------------
const handleEdit = (index, row) => {
//跳转到添加界面---商品添加-编辑-查看详情同一个网页
router.push('/product/addProduct')
//pinia 存储数据 当前行的数据 --- 
store.setRowData({
    title:'编辑',
    rowData:row
  })
  console.log('store----',store);
}

//删除按钮-----------------------------------------------
const handleDelete = (index, row) => {
  // console.log(index, row)
  // console.log('ElMessageBox', ElMessageBox);

  ElMessageBox.confirm(
    '你确定删除当前行的数据，确认删除是不可逆的操作?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      //删除操作---操作数据库的接口--------------------------
      let res = await getDeleteItemById({ id: row.id })
      // console.log(res.data);
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        //删除成功--更新当前的视图
        //判断当前的数据是否是当前的页面的最后一条数据--- 
        if(total.value% pageSize.value ==1){
          currentPage.value = currentPage.value -1 > 0?currentPage.value -1:1;
        }
        getList(currentPage.value);
      }

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })

}

onMounted(() => {

  getList();

})



</script>

<style lang="scss" scoped>
.header {
  background: #fff;
  margin-bottom: 20px;
  padding: 10px;

  .el-form-item {
    margin-bottom: 16px;
  }

  .group {
    border: 1px solid #eee;
    padding: 8px;
  }
}

.content {
  background: #fff;

  ::v-deep .active-header {
    color: #333;
    text-align: center;
  }

  ::v-deep .table-center {
    text-align: center;
  }

  .pagination {
    padding: 10px;
  }
}
</style>