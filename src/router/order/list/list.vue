<template>
    <div>
      <Breadcrumb></Breadcrumb>
      <!-- 顶部区域 -->
      <div class="header">
        <div class="form">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="预定编号">
              <el-input v-model="formInline.name" placeholder="预定编号"></el-input>
            </el-form-item>
            <el-form-item label="预定时间">
              <el-date-picker v-model="formInline.date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="group">
          <el-button type="warning" @click="orderCollect">订单汇总</el-button>
          <!-- <el-button type="warning">导出</el-button> -->
          <el-button class="order-btn" type="warning" @click="download">导出</el-button>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="content">
        <el-table id="table" :data="tableData" border style="width: 100%" header-cell-class-name="active-header"
          cell-class-name="table-center" @select="select">
          <el-table-column type="selection" width="55" :selectable="selectable">
          </el-table-column>
          <el-table-column prop="code" label="订单编号">
            <template #default="scope">
              <span @click="toOrderDecs(scope.row)" style="color:blue;cursor: pointer;">{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ordername" label="下单人">
          </el-table-column>
          <el-table-column prop="company" label="所属单位">
          </el-table-column>
          <el-table-column prop="phone" label="联系电话">
          </el-table-column>
          <el-table-column prop="yudingTime" label="预定时间">
            <!-- <template slot-scope="scope">
              {{ dayjs(scope.row.yudingTime).format('YYYY-MM-DD') }}
            </template> -->
          </el-table-column>
          <el-table-column prop="price" label="订单总价格">
          </el-table-column>
          <el-table-column prop="huizongStatus" label="汇总状态">
            <!-- <template slot-scope="scope">
              {{ scope.row.huizongStatus == 1 ? '未汇总' : '已汇总' }}
            </template> -->
          </el-table-column>
        </el-table>
  
        <!-- 分页 -->
        <div style="padding:10px;">
  
          <Pagination :total="total" :pageSize="pageSize" @getCurrentPage="CurrentChange"></Pagination>
        </div>
  
      </div>
  
      <!-- 抽屉组件 -->
      <!-- <OrderDecs ref="child"></OrderDecs> -->
    </div>
  </template>
  
  <script setup>
  import dayjs from 'dayjs'
  import  Pagination  from "@/pagination/Pagination.vue";
  import OrderDecs from './OrderDecs.vue'
  import { ref } from 'vue'
  import { orderList, changeStatus } from '@/api/order'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import "element-plus/theme-chalk/el-message-box.css";
  //导出excel文件
  import * as XLXS from "xlsx";
  import FileSaver from "file-saver";
  
  
  const formInline = ref({})
  const tableData = ref([])//订单列表数据展示
  const total = ref(10)
  const pageSize = ref(1)
  const ids = ref([])//操作id数组集合]
  const currentPage = ref(1)
  //导出名称
  const name=ref('首客生鲜')
  const child= ref(null)
  
  //导出excel文件-----------------------------
  const download = () => {
    // 通过id，获取导出的表格数据 将表格转换为一个 Workbook 对象（即 Excel 文件的数据结构）
    const wb = XLXS.utils.table_to_book(document.getElementById("table"), {
      raw: true,
    });
    const wbout = XLXS.write(wb, {
      bookType: "xlsx",
      bookSST: true,
      type: "array",
    });
    try {
      FileSaver.saveAs(new Blob([wbout], {
        // 定义文件格式流
        type: "application/octet-stream", //第一个参数 创建的一个 Blob 对象，这个对象包含了之前生成的 Excel 文件的数据流
      }),
        name.value + ".xlsx" // 第二个 保存的文件名
      );
    } catch (e) {
      console.log(e);
    }
    return wbout;
  }
  
  //点击进入订单详情界面------------------------
  const toOrderDecs = () => {
    child.value.drawer = true;
  }
  //点击订单汇总------1.获取选中的订单 2. 提交汇总  3. 修改汇总状态-------------------
  const orderCollect = () => {
    //判断ids长度 至少>=2 
    if (ids.value.length >= 2) {
      //汇总订单
      console.log('ids---', ids.value);
      changeStatus({ ids: ids.value.join(',') })
        .then(res => {
          console.log('汇总了----', res.data);
          if (res.data.status === 200) {
            ElMessage({
              showClose: true,
              message: '汇总成功!',
              type: 'success',
            })
            getOrderList(currentPage.value);
          }
        })
  
    } else {
      ElMessageBox.alert('汇总订单至少需要2条订单信息', '汇总订单', {
        confirmButtonText: '确定',
        callback: () => {
          ElMessage({
            message: '取消汇总!',
            type: 'info',
          })
        },
      })
  
    }
  
  }
  //选中勾选内容-----------------
  const select = (selection, row) => {
    console.log(selection, row);
    let arr = []
    selection.forEach(ele => {
      arr.push(ele.id)
    })
    ids.value = arr;
    //存储当前的勾选行的数据信息------ 
  
  }
  
  //获取分页页码------------------------------
  const CurrentChange = (page) => {
    getOrderList(page)
    currentPage.value = page
  }
  //禁用按钮-------------------------------
  const selectable = (row, index) => {
    // console.log('row, index',row, index);
    // return false;
    if (row.huizongStatus == '未汇总') {
      return true;
    } else {
      return false;
    }
  }
  
  //获取订单列表-------------------------------------
  const getOrderList = async (page) => {
    let res = await orderList({ page })
    console.log('订单列表---', res.data);
    if (res.data.status == 200) {
      let arr = res.data.data;
      arr.forEach(ele => {
        ele.huizongStatus = ele.huizongStatus == 1 ? '未汇总' : "已汇总"
        ele.yudingTime = dayjs(ele.yudingTime).format('YYYY-MM-DD')
      })
      tableData.value = arr;
      console.log('数据tableData', tableData.value);
  
      total.value = res.data.total;
      pageSize.value = res.data.pageSize;
    } else {
      tableData.value = []
      total.value = 1;
      pageSize.value = 1;
    }
  }
  
  getOrderList();
  
  
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
  
  .export-excel-wrapper {
    display: inline-block;
    margin-left: 10px;
  
    button {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  </style>