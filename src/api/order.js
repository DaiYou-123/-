/* 
    当前接口

*/
import axios from "@/utils/request";

//定义接口
export const host = "http://localhost:6688"; //代理请求

//订单管理
const base = {
  //订单管理
  orderList: "/api/order/list", //订单列表 page
  changeStatus: "/api/order/changeStatus", //订单汇总
  collect: "/api/order/collect", //汇总清单列表 page
  cancel: "/api/order/cancel", //撤销汇总 id
  detail: "/api/order/list/detail", //订单详情  id
};

/* 
    订单列表
  */
export const orderList = (params) => {
  return axios.get(base.orderList, { params });
};
/* 
      订单汇总---ids=''
      */
export const changeStatus = (params) => {
  return axios.get(base.changeStatus, { params });
};
/* 
      汇总清单
      {page}
       */
export const collect = (params) => {
  return axios.get(base.collect, { params });
};
/* 
        撤销汇总
        {id}
      */
export const cancel = (params) => {
  return axios.get(base.cancel, { params });
};
/* 
        订单详情
        {id}
      */
export const getDetail = (params) => {
  return axios.get(base.detail, { params });
};
