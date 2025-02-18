import { ref } from 'vue';
import { defineStore } from 'pinia';

export const dataStore = defineStore('dataStore', () => {
    const authorization = ref("");
  
    return {
      authorization,
    };
  }, {
    persist: {
      enabled: true,
      storage: sessionStorage // 🔹 sessionStorage에 저장 (브라우저 종료 시 데이터 삭제)
    }
});
  
