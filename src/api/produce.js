// 产品管理接口

import request from "@/utils/request"; // 一个封装了Http 请求的工具库
//定义接口
export const host = "http://localhost:6688"; //代理请求

const projectList = "/api/goods/projectList"; //商品列表 page 页码
const search = "/api/goods/search"; //参数：search
const deleteItemById = "/api/goods/deleteItemById"; //删除id
const selectItemCategoryByParentId =
  "/api/goods/itemCategory/selectItemCategoryByParentId"; //产品类目 type

//上传图片
export const uploadUrl = "/api//upload";
const addgoods = "/api/goods/item/insertTbItem"; //添加商品
const updateTbItem = "/api/goods/item/updateTbItem"; //商品编辑



//定义方法
// //定义方法
// export function HomeTotal(){
//     return request.get(homeTotal) // 函数通过调用request.get方法，并传入相应的API接口路径，来发送HTTP GET请求
// }
export function getprojectList(params) {
  return request.get(projectList, { params });
}
export function getsearch(params) {
  return request.get(search, { params });
}
export function getDeleteItemById(params) {
  return request.get(deleteItemById, { params });
}
export function getSelectItemCategoryByParentId(params) {
  return request.get(selectItemCategoryByParentId, { params });
}
export function getAddgoods(params) {
  return request.get(addgoods, { params });
}




// export default {
//     projectList(params) {
//       return request.get(projectList, { params });
//     },
//     search(params) {
//       return request.get(search, { params });
//     },
//     deleteItemById(params) {
//       return request.get(deleteItemById, { params });
//     },
  
//     selectItemCategoryByParentId(params) {
//       return request.get(selectItemCategoryByParentId, { params });
//     },
//     addGoods(params) {
//       return request.get(addgoods, { params });
//     },
//     updateTbItem(params) {
//       return request.get(updateTbItem, { params });
//     },
// }
