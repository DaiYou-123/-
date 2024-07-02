<template>
    <div>
      <Breadcrumb></Breadcrumb>
      <!-- 顶部区域 -->
      <div class="header">
        <div class="form">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="预定编号">
              <el-input v-model="formInline.name" size="small" placeholder="预定编号"></el-input>
            </el-form-item>
            <el-form-item label="预定时间">
              <el-date-picker v-model="formInline.date" size="small" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="group">
          <el-button  type="warning">导出</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="content">
        <el-table :data="tableData" border style="width: 100%" header-cell-class-name="active-header"
          cell-class-name="table-center">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="orderNum" label="汇总单编号">
          </el-table-column>
          <el-table-column prop="operator" label="汇总人">
          </el-table-column>
          <el-table-column prop="phone" label="联系电话">
          </el-table-column>
          <el-table-column prop="time" label="汇总时间">
            <template #default="scope">
              {{ dayjs(scope.row.yudingTime).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column prop="totalPrice" label="汇总单总价格">
          </el-table-column>
          <el-table-column label="操作">
            <template  #default="scope">
              <el-button  type="danger" @click="handleEdit(scope.$index, scope.row)">撤销汇总</el-button>
            </template>
          </el-table-column>
        </el-table>
  
        <!-- 分页 -->
        <Pagination :total="total" :pageSize="pageSize" ></Pagination>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import dayjs from 'dayjs'
  import  Pagination  from "@/pagination/Pagination.vue";
  import { collect,cancel } from '@/api/order'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import "element-plus/theme-chalk/el-message-box.css";
  import {ref} from 'vue'
  
  const formInline = ref({})
  const tableData = ref([])//订f列表数据展示
  const total = ref(10)
  const pageSize = ref(1)
  
  //撤销汇总----------------------------
  const handleEdit = (index, row) => {
    ElMessageBox.confirm(
      '此操作将撤销订单该文件, 是否继续?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        console.log('--------------------------');
        let res = await cancel({ id: row.id })
        console.log('res.data',res.data);
        if (res.data.status === 200) {
          ElMessage({
            type: 'success',
            message: '撤销成功！',
          })
          //视图更新
          getCollect(1)
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消撤销',
        })
      })
  
  }
  //获取汇总清单列表---------------------
  const getCollect = async (page) => {
    let res = await collect({ page })
    console.log('汇总清单列表---', res.data);
    if (res.data.status == 200) {
      tableData.value = res.data.data;
      total.value = res.data.total
      pageSize.value = res.data.pageSize
    } else {
      tableData.value = [];
      total.value = 0
      pageSize.value = 1;
    }
  }
  getCollect();
  
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