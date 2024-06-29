/* 
    存储编辑的商品信息

*/
import { defineStore } from "pinia";

const useGoodsStore = defineStore("goods", {
  state: () => {
    return {
      title: "添加",
      rowData: {},
    };
  },
  actions: { // getters
    setRowData(payload) {
      this.title = payload.title;
      this.rowData = payload.rowData;
    },
  },
  // 开启数据持久化
  persist: true,
});

export default useGoodsStore;
