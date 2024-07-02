// 产品管理接口

import request from "@/utils/request"; // 一个封装了Http 请求的工具库
//定义接口
export const host = "http://localhost:6688"; //代理请求

const projectList = "/api/goods/projectList"; //商品列表 page 页码
const  login = "/api/login"; //登录接口 user pwd---post
const permission = "/api/permission"; //用户权限 token


export function getLogin(params) {
  return request.get(projectList, { params });
}

export function getPermission(params) {
  return request.get(permission, { params });
}


// const base = {
//   //登录
//   // login: "/api/login", //登录接口 user pwd---post
//   // permission: "/api/permission", //用户权限 token

//   //打包项目
//   login: api+"/login", //登录接口 user pwd---post
//   permission: api+"/permission", //用户权限 token

// };

// //定义方法
// /* 
//   登录
//   { user, pwd}
//   */
// export function login(params) {
//   return axios.post(base.login, params);
// }
// /* 
//     用户权限--返回导航内容
//     params={token:''}
//   */
// export function permission(params) {
//   return axios.get(base.permission, {
//     params,
//   });
// }


