<template>
  <div class="home">
    <Breadcrumb></Breadcrumb>
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class='num'>{{ numHandle(totalData.saleTotal) }}</div>
        <div class="bottom">今日销售额：{{ numHandle(totalData.sale) }}</div>
      </div>
      <div class="item">总访问量
        <div class='num'>{{ numHandle(totalData.viewsTotal) }}</div>
        <div class="bottom">今日访问量：{{ numHandle(totalData.views) }}</div>
      </div>
      <div class="item">总收藏量
        <div class='num'>{{ numHandle(totalData.collectTotal) }}</div>
        <div class="bottom">今日销售额：{{ numHandle(totalData.collect) }}</div>
      </div>
      <div class="item">总支付量
        <div class='num'>{{ numHandle(totalData.payTotal) }}</div>
        <div class="bottom">今日支付量：{{ numHandle(totalData.pay) }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id='box13'>
        <div class="title">月销售额</div>
        <div id="charts" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">
        <div class="title">产品销售比例</div>
        <div id="pie" style="width: 100%; height: 300px"></div>
      </div>
    </div>


    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单数</div>
              <div>{{ orderData.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">今日金额</div>
              <div>{{ orderData.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单数</div>
              <div>{{ orderData.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{ orderData.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script setup>
// 导入接口
import { HomeTotal, getFormat, getOrder } from '@/api/home'
import { onMounted } from 'vue';
import { ref } from "vue";
// import  echarts  from '@/plugins/echarts.ts'; // 按需
import * as echarts from 'echarts'; // 全局引用
const totalData = ref({})
const orderData = ref({})

// 获取 顶部数据 封装为方法
const getHometotal = async () => {
  let res = await HomeTotal();
  // console.log('首页获取数据', res.data);
  totalData.value = res.data.data.list;
}
// 获取 订单数据
const getTodayOrder = async () => {
  let res = await getOrder();
  orderData.value = res.data.list;
}
// 获取 图表数据
const getFormatData = async () => {
  let res = await getFormat();
  console.log('图表获取数据', res.data.result.data.sale_money);
  // 包括了折线图（三个数组） 和饼图数据（键值对）
  let data = res.data.result.data.sale_money;
  console.log('数据-----', data);
  let x_data = [], lineData = [], barData = [], pieData = [];
  data.forEach(element => {
    x_data.push(element.name)
    lineData.push(element.total_amount)
    barData.push(element.num)
    pieData.push({name:element.name,value:element.num})
  });
  // console.log("bingtu",pieData);
  // 绘制 折线图
  drawLine(x_data,lineData,barData);
  // 绘制饼图
  drawPie(pieData);

}

//方法 数据格式----23456 --> 23,456
const numHandle = (value) => {
  if (!value) return;
  return value.toLocaleString();
}

const drawLine = (data,lineData,barData) => {
  // let myChart = echarts.init(document.getElementById('box13'));
  let dsiab_com = document.getElementById("box13")
  dsiab_com.removeAttribute('_echarts_instance_')
  var myChart = echarts.init(dsiab_com);

  // 绘制图表
  myChart.setOption({
    tooltip: {},
    xAxis: {
      data:data
    },
    yAxis: {},
    series: [
      {
        name: '销量额',
        type: 'line', // 小写
        data: lineData
      },
      {
        name: '销量量',
        type: 'bar', // 小写
        data: barData
      },
    ]
  });
}

const drawPie = (pieData) => {

  // let myChartPei = echarts.init(document.getElementById("box1"));
 // 移除了_echarts_instance属性， 然后在该元素上初始化了一个新的ECharts实例
 let dsiab_com = document.getElementById("box1")
  dsiab_com.removeAttribute('_echarts_instance_')
  var myChartPei = echarts.init(dsiab_com);

  myChartPei.setOption({
    title: {
      text: '销售额',
      subtext: '饼图 Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '销售额',
        type: 'pie',
        radius: '50%',
        data:  pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

}
// 进入界面--获取数据--生命周期挂载
onMounted(() => {
  getHometotal(); // 获取数据
  getTodayOrder(); // 获取数据
  getFormatData(); // 获取数据 并 绘制图表

})
</script>

<style lang="scss" scoped>
// .home {
//   margin: 10px;
// }

.header {
  display: flex;
  padding-right: 30px;

  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;

    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }

    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }

  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }

  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }

  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }

  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

// 图表

.content {
  margin: 20px;
  display: flex;
  height: 320px;

  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }

  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;

  .clearfix {
    margin-bottom: 20px;
  }

  .box-card {
    flex: 1;
    margin-right: 30px;

    span {
      font-weight: 600;
    }
  }

  .item {
    text-align: center;
    font-size: 24px;
    color: #333;

    .el-col {
      border-right: 1px solid #eee;

    }

    .el-col:last-child {
      border-right: none;
    }

    .title {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>
