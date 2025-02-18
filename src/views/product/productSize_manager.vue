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
            harumarket_productSize_name: null,
            dataStores: dataStore(),
            productSize_manager_insertModal: null,
            productSize_manager_updateModal: null,
            myModalInstance: null,
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.search = this.$refs.search;
            this.result = this.$refs.result;
            this.productSize_manager_insertModal = this.$refs.productSize_manager_insertModal;
            this.productSize_manager_updateModal = this.$refs.productSize_manager_updateModal;
            this.search.style.height = (screen.height / 5 + 0) + "px";
            this.result.style.height = (screen.height / 1.6 + 0) + "px";

            this.harumarket_productSize_name = this.$refs.harumarket_productSize_name;
        })

        this.firstGrid.setConfig({
            target: $('[data-ax5grid="first-grid"]'),
            columns: [
            { key: "harumarket_productSize_name", label: "크기 이름", width:150 },
                { key: "harumarket_productSize_insertTime", label: "등록 시간" ,width:170},
                { key: "harumarket_productSize_insertUserIndex", label: "등록 시도 계정" },
                { key: "haruMarket_productSize_updateTime", label: "수정 시간" ,width:170},
                { key: "haruMarket_productSize_updateUserIndex", label: "수정 시도 계정" },
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

        this.myModalInstance = new bootstrap.Modal(this.productSize_manager_updateModal, {});
    },
    methods: {
        async searchF() {
            let req = {
                harumarket_productSize_name: this.harumarket_productSize_name ? this.harumarket_productSize_name.value : '',
            }

            let responData = await httpRequest("POST", "https://back1.haru.company/admin/productSize_manager_search", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("POST", "https://back1.haru.company/admin/productSize_manager_search", req, this.dataStores.authorization);
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
        insert() {
            var myModal = new bootstrap.Modal(this.productSize_manager_insertModal, {});
            myModal.show();
        },
        async insert_process() {
            const insertForm = new FormData(this.$refs.insertForm);
            let harumarket_productSize_name = insertForm.get('harumarket_productSize_name');

            if (harumarket_productSize_name == "") {
                toastr.error('상품 색상 이름을 입력하여 주십시오.');
                this.$refs.insertForm.querySelector('input[name="harumarket_productSize_name"]').focus();
                return;
            }
            if (harumarket_productSize_name.length >= 10) {
                toastr.error('상품 색상 이름은 10글자 이내로 작성하여 주십시오.');
                this.$refs.insertForm.querySelector('input[name="harumarket_productSize_name"]').focus();
                return;
            }
            let req = {
                harumarket_productSize_name: harumarket_productSize_name,
            }

            let responData = await httpRequest("PUT", "https://back1.haru.company/admin/productSize_manager_insert", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("PUT", "https://back1.haru.company/admin/productSize_manager_insert", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                toastr.success("색상이 등록 되었습니다.");
                await this.searchF();
            }
        },
        async update() {
            var checkedList = this.firstGrid.getList("selected");
            if (checkedList.length == 0 || checkedList.length > 1) {
                toastr.error('수정할 색상을 한개 선택하여 주십시오.');
                return;
            }

            var selectedRows = this.firstGrid.getList('selected');
            let harumarket_productSize_index = selectedRows[0].harumarket_productSize_index;

            let req = {
                harumarket_productSize_index: Number(harumarket_productSize_index),
            }

            let responData = await httpRequest("POST", "https://back1.haru.company/admin/productSize_manager_view", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("POST", "https://back1.haru.company/admin/productSize_manager_view", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                let res = responData.data;

                let harumarket_productSize_name = this.$refs.updateForm.querySelector('input[name="harumarket_productSize_name"]');
                harumarket_productSize_name.value = res.harumarket_productSize_name;

                this.myModalInstance = new bootstrap.Modal(this.productSize_manager_updateModal, {});
                this.myModalInstance.show();
            }
        },
        async update_process() {
            var selectedRows = this.firstGrid.getList('selected');
            let harumarket_productSize_index = selectedRows[0].harumarket_productSize_index;

            const updateForm = new FormData(this.$refs.updateForm);

            let harumarket_productSize_name = updateForm.get('harumarket_productSize_name');

            if (harumarket_productSize_name == "") {
                toastr.error('상품 색상 이름을 입력하여 주십시오.');
                this.$refs.insertForm.querySelector('input[name="harumarket_productSize_name"]').focus();
                return;
            }
            if (harumarket_productSize_name.length >= 10) {
                toastr.error('상품 색상 이름은 10글자 이내로 작성하여 주십시오.');
                this.$refs.insertForm.querySelector('input[name="harumarket_productSize_name"]').focus();
                return;
            }
            
            let req = {
                harumarket_productSize_name: harumarket_productSize_name,
                harumarket_productSize_index: harumarket_productSize_index
            }

            let responData = await httpRequest("PATCH", "https://back1.haru.company/admin/productSize_manager_update", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("PATCH", "https://back1.haru.company/admin/productSize_manager_update", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                toastr.success("상품 색상이 수정되었습니다.");
                this.myModalInstance.hide();
                await this.searchF();
            }
        }
    }
}
</script>
<template>
    <div class="container-fluid h-100 w-100 p-0 m-0">
        <navComponent category="product" category_detail="productSize_manager" />
        <div class="row">
            <div class="col-12 pb-0" ref="search">
                <div class="card h-100">
                    <div class="card-header">
                        상품 색상 관리
                    </div>
                    <div class="card-body p-0">
                        <div class="card-title h-100">
                            <div class="container-fluid pt-1">
                                <div class="row">
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <span class="input-group-text" id="basic-addon1">크기 이름</span>
                                            <input ref="harumarket_productSize_name" type="text" class="form-control"
                                                placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                                style="height:31px;">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="position-absolute bottom-0 w-100 p-1">
                                <button class="btn btn-primary btn-sm me-1" type="button" @click="searchF">조회</button>
                                <button class="btn btn-success btn-sm me-1" type="button" @click="insert">등록</button>
                                <button class="btn btn-warning btn-sm me-1" type="button" @click="update">수정</button>
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

    <!-- 등록 모달창 -->
    <form ref="insertForm">
        <div class="modal" tabindex="-1" ref="productSize_manager_insertModal">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">상품 크기 등록</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid pt-1">
                            <div class="row">
                                <div class="col-12">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">상품 크기 이름</span>
                                        <input name="harumarket_productSize_name" type="text" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-success" @click="insert_process">등록</button>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <!-- 수정 모달창 -->
    <form ref="updateForm">
        <div class="modal" tabindex="-1" ref="productSize_manager_updateModal">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">상품 크기 수정</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid pt-1">
                            <div class="row">
                                <div class="col-12">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">상품 크기 이름</span>
                                        <input name="harumarket_productSize_name" type="text" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
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