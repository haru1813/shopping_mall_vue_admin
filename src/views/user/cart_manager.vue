<script>
import navComponent from '@/components/nav.vue';
import { dataStore } from '@/stores/dataStore';
import { httpRequest } from '@/tool.js';
export default {
    components: {
        navComponent
    },
    data: function () {
        return {
            search: null,
            result: null,
            firstGrid: new ax5.ui.grid(),
            haruMarket_user_id: null,
            harumarket_product_name: null,
            dataStores: dataStore(),
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.search = this.$refs.search;
            this.result = this.$refs.result;
            this.search.style.height = (screen.height / 5 + 0) + "px";
            this.result.style.height = (screen.height / 1.6 + 0) + "px";

            this.haruMarket_user_id = this.$refs.haruMarket_user_id;
            this.harumarket_product_name = this.$refs.harumarket_product_name;
        })

        this.firstGrid.setConfig({
            target: $('[data-ax5grid="first-grid"]'),
            columns: [
                { key: "haruMarket_user_id", label: "아이디" },
                { key: "harumarket_product_name", label: "상품 이름", width:250 },
                { key: "harumarket_productColor_name", label: "상품 색상" },
                { key: "harumarket_productSize_name", label: "상품 크기" },
                { key: "harumarket_userBasket_account", label: "상품 개수" },
                { key: "harumarket_product_salePrice", label: "상품 가격" },
                { key: "harumarket_userBasket_insertTime", label: "등록 시간" ,width:170},
            ],
            header: {
                align: "center",
                selector: false,
            },
            showLineNumber: true,
            showRowSelector: true,
            multipleSelect: false
        });

        await this.searchF();
    },
    methods: {
        async searchF() {
            let req = {
                haruMarket_user_id: this.haruMarket_user_id ? this.haruMarket_user_id.value : '',
                harumarket_product_name: this.harumarket_product_name ? this.harumarket_product_name.value : '',
            }

            let responData = await httpRequest("POST", "https://back1.haru.company/admin/cart_manager_search", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("POST", "https://back1.haru.company/admin/cart_manager_search", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                this.firstGrid.setData(responData.data);
            }
        },
        async deleteF(){
            var checkedList = this.firstGrid.getList("selected");
            if (checkedList.length == 0){
                toastr.error('삭제할 장바구니를 한개 이상 선택하여 주십시오.');
                return;
            }
            checkedList.forEach(async data => {
                let req = {
                    harumarket_userBasket_index : data.harumarket_userBasket_index
                }
                let responData = await httpRequest("POST", "https://back1.haru.company/admin/cart_manager_delete", req, this.dataStores.authorization);
                if (responData.status != 200) {
                    responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                    if (responData.status == 200) {
                        this.dataStores.authorization = responData.data.token;
                        responData = await httpRequest("POST", "https://back1.haru.company/admin/cart_manager_delete", req, this.dataStores.authorization);
                    }
                    else {
                        toastr.error("로그아웃 되었습니다.");
                        this.dataStores.authorization = "";
                        this.$router.replace('/');
                    }
                }
                else{
                    toastr.success("삭제되었습니다.");
                }
            });
            await this.searchF();
        }
    }
}
</script>
<template>
    <div class="container-fluid h-100 w-100 p-0 m-0">
        <navComponent category="user" category_detail="cart_manager" />
        <div class="row">
            <div class="col-12 pb-0" ref="search">
                <div class="card h-100">
                    <div class="card-header">
                        장바구니 관리
                    </div>
                    <div class="card-body p-0">
                        <div class="card-title h-100">
                            <div class="container-fluid pt-1">
                                <div class="row">
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <span class="input-group-text" id="basic-addon1">아이디</span>
                                            <input ref="haruMarket_user_id" type="text" class="form-control"
                                                placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                                style="height:31px;">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <span class="input-group-text" id="basic-addon1">상품 이름</span>
                                            <input ref="harumarket_product_name" type="text" class="form-control"
                                                placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                                style="height:31px;">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="position-absolute bottom-0 w-100 p-1">
                                <button class="btn btn-primary btn-sm me-1" type="button" @click="searchF">조회</button>
                                <button class="btn btn-danger btn-sm me-1" type="button" @click="deleteF">삭제</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-12 mt-2" ref="result">
                <div class="container-fluid h-100">
                    <div class="col-12 w-100 h-100 align-items-center">
                        <div data-ax5grid="first-grid" data-ax5grid-config="{
                        showLineNumber: true,
                        showRowSelector: true,
                        multipleSelect: true
                    }" style="height: calc(70vh);"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>