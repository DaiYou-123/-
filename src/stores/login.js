/* 
    存储登录信息

*/
import { defineStore } from "pinia";

const useLoginStore = defineStore("goods", {
  state: () => {
    return { // 用户信息
      username: '',
      token: '',
    };
  },
  actions: { 
    // 设置登录信息
    setUser(payload) {
      this.username = payload.userName;
      this.token = payload.token;
    //   console.log('ceshi=------',payload);
    },
    // 退出清除
    removeUser() {
      this.username = '';
      this.token = '';
    }
  },
  // 开启数据持久化
  persist: true,
});

export default useLoginStore;
