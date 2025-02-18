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
            haruMarket_productCategory_name: null,
            haruMarket_productCategory_view: null,
            dataStores: dataStore(),
            category_manager_insertModal: null,
            category_manager_updateModal: null,
            myModalInstance: null,
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.search = this.$refs.search;
            this.result = this.$refs.result;
            this.category_manager_insertModal = this.$refs.category_manager_insertModal;
            this.category_manager_updateModal = this.$refs.category_manager_updateModal;
            this.search.style.height = (screen.height / 5 + 0) + "px";
            this.result.style.height = (screen.height / 1.6 + 0) + "px";

            this.haruMarket_productCategory_name = this.$refs.haruMarket_productCategory_name;
            this.haruMarket_productCategory_view = this.$refs.haruMarket_productCategory_view;
        })

        this.firstGrid.setConfig({
            target: $('[data-ax5grid="first-grid"]'),
            columns: [
                { key: "haruMarket_productCategory_name", label: "카테고리 이름", width: 100 },
                { key: "haruMarket_productCategory_view", label: "노출 여부" },
                { key: "haruMarket_productCategory_insertTime", label: "등록 시간", width: 170 },
                { key: "haruMarket_productCategory_insertUserIndex", label: "등록 시도 계정" },
                { key: "haruMarket_productCategory_updateTime", label: "수정 시간", width: 170 },
                { key: "haruMarket_productCategory_updateUserIndex", label: "수정 시도 계정" },
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

        this.myModalInstance = new bootstrap.Modal(this.category_manager_updateModal, {});
    },
    methods: {
        async searchF() {
            let req = {
                haruMarket_productCategory_name: this.haruMarket_productCategory_name ? this.haruMarket_productCategory_name.value : '',
                haruMarket_productCategory_view: this.haruMarket_productCategory_view ? this.haruMarket_productCategory_view.value : '',
            }

            let responData = await httpRequest("POST", "https://back1.haru.company/admin/category_manager_search", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("POST", "https://back1.haru.company/admin/category_manager_search", req, this.dataStores.authorization);
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
            var myModal = new bootstrap.Modal(this.category_manager_insertModal, {});
            myModal.show();
        },
        async insert_process() {
            const insertForm = new FormData(this.$refs.insertForm);
            let haruMarket_productCategory_name = insertForm.get('haruMarket_productCategory_name');
            let haruMarket_productCategory_view = insertForm.get('haruMarket_productCategory_view');

            if (haruMarket_productCategory_name == "") {
                toastr.error('카테고리 이름을 입력하여 주십시오.');
                this.$refs.insertForm.querySelector('input[name="haruMarket_productCategory_name"]').focus();
                return;
            }
            if (haruMarket_productCategory_name.length >= 10) {
                toastr.error('카테고리 이름은 10자 이내로 입력하여 주십시오.');
                this.$refs.insertForm.querySelector('input[name="haruMarket_productCategory_name"]').focus();
                return;
            }
            if (haruMarket_productCategory_view == "") {
                toastr.error('홈페이지 노출 여부를 입력하여 주십시오.');
                this.$refs.insertForm.querySelector('input[select="haruMarket_productCategory_view"]').focus();
                return;
            }

            let req = {
                haruMarket_productCategory_name: haruMarket_productCategory_name,
                haruMarket_productCategory_view: haruMarket_productCategory_view,
            }

            let responData = await httpRequest("PUT", "https://back1.haru.company/admin/category_manager_insert", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("PUT", "https://back1.haru.company/admin/category_manager_insert", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                toastr.success("카테고리가 저장되었습니다.");
                await this.searchF();
            }
        },
        async update() {
            var checkedList = this.firstGrid.getList("selected");
            if (checkedList.length == 0 || checkedList.length > 1){
                toastr.error('수정할 카테고리를 한개 선택하여 주십시오.');
                return;
            }

            var selectedRows = this.firstGrid.getList('selected');
            let haruMarket_productCategory_index = selectedRows[0].haruMarket_productCategory_index;

            let req = {
                haruMarket_productCategory_index: Number(haruMarket_productCategory_index),
            }

            let responData = await httpRequest("POST", "https://back1.haru.company/admin/category_manager_view", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("POST", "https://back1.haru.company/admin/category_manager_view", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                let res = responData.data;

                let haruMarket_productCategory_name = this.$refs.updateForm.querySelector('input[name="haruMarket_productCategory_name"]');
                haruMarket_productCategory_name.value = res.haruMarket_productCategory_name;

                let haruMarket_productCategory_view = this.$refs.updateForm.querySelector('select[name="haruMarket_productCategory_view"]');
                haruMarket_productCategory_view.value = res.haruMarket_productCategory_view;

                this.myModalInstance = new bootstrap.Modal(this.category_manager_updateModal, {});
                this.myModalInstance.show();
            }
        },
        async update_process(){
            var selectedRows = this.firstGrid.getList('selected');
            let haruMarket_productCategory_index = selectedRows[0].haruMarket_productCategory_index;

            const updateForm = new FormData(this.$refs.updateForm);
            let haruMarket_productCategory_name = updateForm.get('haruMarket_productCategory_name');
            let haruMarket_productCategory_view = updateForm.get('haruMarket_productCategory_view');

            if (haruMarket_productCategory_name == "") {
                toastr.error('카테고리 이름을 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_productCategory_name"]').focus();
                return;
            }
            if (haruMarket_productCategory_name.length >= 10) {
                toastr.error('카테고리 이름은 10자 이내로 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_productCategory_name"]').focus();
                return;
            }
            if (haruMarket_productCategory_view == "") {
                toastr.error('홈페이지 노출 여부를 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[select="haruMarket_productCategory_view"]').focus();
                return;
            }

            let req = {
                haruMarket_productCategory_name: haruMarket_productCategory_name,
                haruMarket_productCategory_view: haruMarket_productCategory_view,
                haruMarket_productCategory_index: haruMarket_productCategory_index,
            }

            let responData = await httpRequest("PATCH", "https://back1.haru.company/admin/category_manager_update", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("PATCH", "https://back1.haru.company/admin/category_manager_update", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                toastr.success("카테고리가 수정되었습니다.");
                this.myModalInstance.hide();
                await this.searchF();
            }
        }
    }
}
</script>
<template>
    <div class="container-fluid h-100 w-100 p-0 m-0">
        <navComponent category="product" category_detail="category_manager" />
        <div class="row">
            <div class="col-12 pb-0" ref="search">
                <div class="card h-100">
                    <div class="card-header">
                        상품 카테고리 관리
                    </div>
                    <div class="card-body p-0">
                        <div class="card-title h-100">
                            <div class="container-fluid pt-1">
                                <div class="row">
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <span class="input-group-text" id="basic-addon1">카테고리 이름</span>
                                            <input ref="haruMarket_productCategory_name" type="text"
                                                class="form-control" placeholder="" aria-label="Username"
                                                aria-describedby="basic-addon1" style="height:31px;">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">홈페이지 노출 여부</label>
                                            <select ref="haruMarket_productCategory_view" class="form-select"
                                                style="height:31px;">
                                                <option value="" selected>선택</option>
                                                <option value="1">노출</option>
                                                <option value="0">비노출</option>
                                            </select>
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
        <div class="modal" tabindex="-1" ref="category_manager_insertModal">
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">카테고리 등록</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid pt-1">
                            <div class="row">
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">카테고리 이름</span>
                                        <input name="haruMarket_productCategory_name" type="text" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <label class="input-group-text" for="inputGroupSelect01">홈페이지 노출 여부</label>
                                        <select name="haruMarket_productCategory_view" class="form-select"
                                            style="height:31px;">
                                            <option value="" selected>선택</option>
                                            <option value="1">노출</option>
                                            <option value="0">비노출</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-success" v-on:click="insert_process">등록</button>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <!-- 수정 모달창 -->
    <form ref="updateForm">
        <div class="modal" tabindex="-1" ref="category_manager_updateModal">
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">카테고리 수정</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid pt-1">
                            <div class="row">
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">카테고리 이름</span>
                                        <input name="haruMarket_productCategory_name" type="text" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <label class="input-group-text" for="inputGroupSelect01">홈페이지 노출 여부</label>
                                        <select name="haruMarket_productCategory_view" class="form-select"
                                            style="height:31px;">
                                            <option value="" selected>선택</option>
                                            <option value="1">노출</option>
                                            <option value="0">비노출</option>
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