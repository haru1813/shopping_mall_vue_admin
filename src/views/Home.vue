<script>
import axios from 'axios';
import { dataStore } from '@/stores/dataStore';
import { httpRequest } from '@/tool.js';
export default {
  data: function () {
    return {
      haruMarket_user_id: null,
      haruMarket_user_pw: null,
      dataStores : dataStore(),
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.haruMarket_user_id = this.$refs.haruMarket_user_id;
      this.haruMarket_user_pw = this.$refs.haruMarket_user_pw;
    })
    if(this.dataStores.authorization != ''){
      this.$router.replace('/main');
    }
  },
  methods:{
    async login(){
      if(this.haruMarket_user_id.value==""){
        toastr.error('아이디를 입력하여 주십시오.');
        this.haruMarket_user_id.focus();
        return;
      }
      if(this.haruMarket_user_pw.value==""){
        toastr.error('비밀번호를 입력하여 주십시오.');
        this.haruMarket_user_pw.focus();
        return;
      }
      const params = new URLSearchParams();
      params.append('haruMarket_user_id', this.haruMarket_user_id.value);
      params.append('haruMarket_user_pw', this.haruMarket_user_pw.value);

      await axios.post('https://back1.haru.company/login', params, {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
      })
      .then(response => {
          console.log(response.headers.authorization);
          this.dataStores.authorization = response.headers.authorization;
          //this.$router.replace('/about');
      })
      .catch(error => {
          console.log(error);
          toastr.error("로그인을 실패하였습니다.");
      });

      let data = await httpRequest("POST","https://back1.haru.company/admin/move",null,this.dataStores.authorization);
      if(data.status != 200){
        toastr.error("비밀번호를 틀리셨거나 관리자 계정이 아닙니다.");
        return;
      }
      console.log(this.dataStores.authorization);
      this.$router.replace('/main');
    }
  }
}
</script>

<template>
<div class="container-fluid h-100 w-100">
  <div class="row h-100 w-100">
    <div class="col-12 h-100 w-100 d-flex justify-content-center align-items-center">
      <div class="card mb-5">
        <div class="card-header">
          하루마켓 관리자 로그인
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="haruMarket_user_id" class="form-label">아이디</label>
            <input type="text" class="form-control" ref="haruMarket_user_id">
          </div>
          <div class="mb-3">
            <label for="haruMarket_user_pw" class="form-label">비밀번호</label>
            <input type="password" class="form-control" ref="haruMarket_user_pw">
          </div>
            <a class="btn btn-primary" @click="login">로그인</a>
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.h-100 {
  height: 100vh !important;
}
</style>
