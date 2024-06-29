// 首页接口

import request from "@/utils/request"; // 一个封装了Http 请求的工具库
// 定义接口
export const host = 'http://localhost:6688'; // 跨域 代理请求
const homeTotal = '/api/home/dataCount'; // * 统计数据（服务器上的API接口 根据路径返回相应内容 加上api/来区分api路径和其他路径）
const format='/api/home/format';//折线图
const order='/api/home/orderinfo';//今日订单数据

//定义方法
export function HomeTotal(){
    return request.get(homeTotal) // 函数通过调用request.get方法，并传入相应的API接口路径，来发送HTTP GET请求
}

export function getFormat(){
    return request.get(format)
}

export function getOrder(){
    return request.get(order)
}
