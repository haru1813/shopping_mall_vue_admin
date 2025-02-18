<script>
import navComponent from '@/components/nav.vue';
import { dataStore } from '@/stores/dataStore';
import { httpRequest } from '@/tool.js';
let authorization = "";
let secondGrid = null;
export default {
    components: {
        navComponent
    },
    data: function () {
        return {
            search: null,
            result: null,
            firstGrid: new ax5.ui.grid(),
            secondGrid: new ax5.ui.grid(),
            haruMarket_user_id: null,
            haruMarket_BuyMaster_order: null,
            haruMarket_BuyMaster_buyerName: null,
            haruMarket_BuyMaster_buyerAddr: null,
            haruMarket_BuyMaster_status: null,
            dataStores: dataStore(),
            buy_manager_updateModal:null,
            myModalInstance: null,
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.search = this.$refs.search;
            this.result = this.$refs.result;
            this.search.style.height = (screen.height / 5 + 0) + "px";
            this.result.style.height = (screen.height / 1.6 + 0) + "px";

            this.haruMarket_user_id = this.$refs.haruMarket_user_id;
            this.haruMarket_BuyMaster_order = this.$refs.haruMarket_BuyMaster_order;
            this.haruMarket_BuyMaster_buyerName = this.$refs.haruMarket_BuyMaster_buyerName;
            this.haruMarket_BuyMaster_buyerAddr = this.$refs.haruMarket_BuyMaster_buyerAddr;
            this.haruMarket_BuyMaster_status = this.$refs.haruMarket_BuyMaster_status;

            this.buy_manager_updateModal = this.$refs.buy_manager_updateModal;
            this.myModalInstance = new bootstrap.Modal(this.buy_manager_updateModal, {});
        })

        this.firstGrid.setConfig({
            target: $('[data-ax5grid="first-grid"]'),
            columns: [
                { key: "haruMarket_user_id", label: "아이디" },
                { key: "haruMarket_BuyMaster_order", label: "주문 번호", width:250 },
                { key: "haruMarket_BuyMaster_buyerName", label: "이름" },
                { key: "haruMarket_BuyMaster_buyerPostcode", label: "우편 번호" },
                { key: "haruMarket_BuyMaster_buyerAddr", label: "주소" },
                { key: "haruMarket_BuyMaster_buyerMethod", label: "결제 방법" },
                { key: "haruMarket_BuyMaster_status", label: "주문 상태" },
                { key: "haruMarket_BuyMaster_amount", label: "결제 금액" },
                { key: "haruMarket_BuyMaster_insertTime", label: "결제 시간" ,width:170},
            ],
            header: {
                align: "center",
                selector: false,
            },
            showLineNumber: true,
            showRowSelector: true,
            multipleSelect: false,
            body: {
                onClick: async function (e) {
                    // 클릭된 row의 데이터
                    const rowData = this.list[this.dindex];

                    // 원하는 동작 수행
                    //console.log(rowData); // 콘솔에 row 데이터 출력

                    let haruMarket_BuyMaster_order = rowData.haruMarket_BuyMaster_order;

                    let req = {
                        haruMarket_BuyMaster_order: haruMarket_BuyMaster_order
                    }

                    let responData = await httpRequest("POST", "https://back1.haru.company/admin/buy_manager_search2", req, authorization);
                    if (responData.status != 200) {
                        responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, authorization);
                        if (responData.status == 200) {
                            authorization = responData.data.token;
                            responData = await httpRequest("POST", "https://back1.haru.company/admin/buy_manager_search2", req, authorization);
                        }
                        else {
                            // toastr.error("로그아웃 되었습니다.");
                            // this.dataStores.authorization = "";
                            // this.$router.replace('/');
                        }
                    }
                    else {
                        secondGrid.setData(responData.data);
                    }
                }
            }
        });
        this.secondGrid.setConfig({
            target: $('[data-ax5grid="second-grid"]'),
            columns: [
                { key: "harumarket_product_name", label: "상품 이름", width: 250 },
                { key: "harumarket_productColor_name", label: "상품 색상" },
                { key: "harumarket_productSize_name", label: "상품 크기" },
                { key: "harumarket_buyDetail_account", label: "상품 개수" },
                { key: "harumarket_buyDetail_amount", label: "결제 금액" },
            ],
            header: {
                align: "center",
                selector: false,
            },
            showLineNumber: true,
            showRowSelector: false,
            multipleSelect: false
        });
        authorization = this.dataStores.authorization;
        secondGrid = this.secondGrid;

        await this.searchF();
    },
    methods: {
        async searchF() {
            let req = {
                haruMarket_user_id: this.haruMarket_user_id ? this.haruMarket_user_id.value : '',
                haruMarket_BuyMaster_order: this.haruMarket_BuyMaster_order ? this.haruMarket_BuyMaster_order.value : '',
                haruMarket_BuyMaster_buyerName: this.haruMarket_BuyMaster_buyerName ? this.haruMarket_BuyMaster_buyerName.value : '',
                haruMarket_BuyMaster_buyerAddr: this.haruMarket_BuyMaster_buyerAddr ? this.haruMarket_BuyMaster_buyerAddr.value : '',
                haruMarket_BuyMaster_status: this.haruMarket_BuyMaster_status ? this.haruMarket_BuyMaster_status.value : '',
            }

            let responData = await httpRequest("POST", "https://back1.haru.company/admin/buy_manager_search1", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("POST", "https://back1.haru.company/admin/buy_manager_search1", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                console.log(responData.data);
                this.firstGrid.setData(responData.data);
            }
        },
        update() {
            var checkedList = this.firstGrid.getList("selected");
            if (checkedList.length == 0 || checkedList.length > 1){
                toastr.error('수정할 주문 번호를 한개 선택하여 주십시오.');
                return;
            }

            let haruMarket_BuyMaster_status = this.$refs.updateForm.querySelector('select[name="haruMarket_BuyMaster_status"]');
            haruMarket_BuyMaster_status.value = checkedList[0].haruMarket_BuyMaster_status;
            this.myModalInstance = new bootstrap.Modal(this.buy_manager_updateModal, {});
            this.myModalInstance.show();
        },
        async update_process(){
            var selectedRows = this.firstGrid.getList('selected');
            let haruMarket_BuyMaster_index = selectedRows[0].haruMarket_BuyMaster_index;
            let haruMarket_BuyMaster_statusN = this.$refs.updateForm.querySelector('select[name="haruMarket_BuyMaster_status"]');
            let haruMarket_BuyMaster_status = haruMarket_BuyMaster_statusN.value;

            let req = {
                haruMarket_BuyMaster_index: haruMarket_BuyMaster_index,
                haruMarket_BuyMaster_status: haruMarket_BuyMaster_status,
            }

            let responData = await httpRequest("PATCH", "https://back1.haru.company/admin/buy_manager_update", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("PATCH", "https://back1.haru.company/admin/buy_manager_update", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            toastr.success("수정 되었습니다.");
            this.myModalInstance.hide();
            await this.searchF();
        }
    }
}
</script>
<template>
    <div class="container-fluid h-100 w-100 p-0 m-0">
        <navComponent category="user" category_detail="buy_manager" />
        <div class="row">
            <div class="col-12 pb-0" ref="search">
                <div class="card h-100">
                    <div class="card-header">
                        결제 관리
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
                                            <span class="input-group-text" id="basic-addon1">주문 번호</span>
                                            <input ref="haruMarket_BuyMaster_order" type="text" class="form-control"
                                                placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                                style="height:31px;">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <span class="input-group-text" id="basic-addon1">이름</span>
                                            <input ref="haruMarket_BuyMaster_buyerName" type="text" class="form-control"
                                                placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                                style="height:31px;">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <span class="input-group-text" id="basic-addon1">주소</span>
                                            <input ref="haruMarket_BuyMaster_buyerAddr" type="text" class="form-control"
                                                placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                                style="height:31px;">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm mt-1">
                                            <label class="input-group-text" for="inputGroupSelect01">주문 상태</label>
                                            <select ref="haruMarket_BuyMaster_status" class="form-select"
                                                style="height:31px;">
                                                <option value="" selected>선택</option>
                                                <option value="결제완료">결제완료</option>
                                                <option value="배송준비중">배송준비중</option>
                                                <option value="배송중">배송중</option>
                                                <option value="배송완료">배송완료</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="position-absolute bottom-0 w-100 p-1">
                                <button class="btn btn-primary btn-sm me-1" type="button" @click="searchF">조회</button>
                                <button class="btn btn-warning btn-sm" type="button" @click="update">수정</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-12 mt-2" ref="result">
                <div class="container-fluid h-100">
                    <div class="row">
                        <div class="col-6 w-50 h-100 align-items-center">
                            <div data-ax5grid="first-grid" style="height: calc(70vh);"></div>
                        </div>
                        <div class="col-6 w-50 h-100 align-items-center">
                            <div data-ax5grid="second-grid" style="height: calc(70vh);"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 수정 모달창 -->
    <form ref="updateForm">
        <div class="modal" tabindex="-1" ref="buy_manager_updateModal">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">주문 상태 수정</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid pt-1">
                            <div class="row">
                                <div class="col-12">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">주문 상태</span>
                                        <select name="haruMarket_BuyMaster_status" class="form-select"
                                            style="height:31px;">
                                            <option value="" selected>선택</option>
                                            <option value="결제완료">결제완료</option>
                                            <option value="배송준비중">배송준비중</option>
                                            <option value="배송중">배송중</option>
                                            <option value="배송완료">배송완료</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-warning" @click="update_process">수정</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>