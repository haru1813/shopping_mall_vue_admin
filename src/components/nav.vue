<script>
import { dataStore } from '@/stores/dataStore';
import { httpRequest } from '@/tool.js';
export default{
    props: ['category','category_detail'],
    created(){
        console.log(this.category);
        console.log(this.category_detail);
    },
    data: function () {
        return {
            dataStores : dataStore(),
        }
    },
    mounted() {
        if(this.dataStores.authorization == ''){
            this.$router.replace('/');
        }
    },
    methods: {
        LOGOUT(){
            this.dataStores.authorization = '';
            this.$router.replace('/');
        },
        async move(url){
            this.$router.replace(url);
            let data = await httpRequest("POST","https://back1.haru.company/admin/move",null,this.dataStores.authorization);
            if(data.status != 200){
                console.log("토큰 유효하지 않음");
                let data2 = await httpRequest("POST","https://back1.haru.company/common/token_refresh",null,this.dataStores.authorization);
                if(data2.status == 200){
                    console.log("토큰 재발급");
                    this.dataStores.authorization = data2.data.token;
                    data = await httpRequest("POST","https://back1.haru.company/admin/move",null,this.dataStores.authorization);
                    this.$router.replace(url);
                }
                else{
                    this.LOGOUT();
                }
            }
            else{
                console.log("토큰 유효");
                this.$router.replace(url);
            }
        }
    },
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" @click="move('/main')">하루마켓 관리자</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false" v-bind:class="{ 'show': this.category === 'user' }">
                            유저 관리
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" @click="move('/user/user_manager')"
                                v-bind:class="{ 'active': this.category_detail === 'user_manager' }">유저 관리</a>
                            </li>
                            <li>
                                <a class="dropdown-item" @click="move('/user/cart_manager')" id="cart_manager"
                                v-bind:class="{ 'active': this.category_detail === 'cart_manager' }">장바구니 관리</a>
                            </li>
                            <li>
                                <a class="dropdown-item" @click="move('/user/buy_manager')"
                                v-bind:class="{ 'active': this.category_detail === 'buy_manager' }">결제 관리</a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false" v-bind:class="{ 'show': this.category === 'product' }">
                            상품 관리
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" @click="move('/product/category_manager')"
                                    v-bind:class="{ 'active': this.category_detail === 'category_manager' }">상품 카테고리 관리</a>
                            </li>
                            <li>
                                <a class="dropdown-item" @click="move('/product/productColor_manager')"
                                    v-bind:class="{ 'active': this.category_detail === 'productColor_manager' }">상품 색상 관리</a>
                            </li>
                            <li>
                                <a class="dropdown-item" @click="move('/product/productSize_manager')"
                                    v-bind:class="{ 'active': this.category_detail === 'productSize_manager' }">상품 크기 관리</a>
                            </li>
                            <li>
                                <a class="dropdown-item" @click="move('/product/product_manager')"
                                    v-bind:class="{ 'active': this.category_detail === 'product_manager' }">상품 관리</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex">
                    <a class="btn btn-outline-success" aria-current="page" @click="LOGOUT">LOGOUT</a>
                </form>
            </div>
        </div>
    </nav>
</template>
