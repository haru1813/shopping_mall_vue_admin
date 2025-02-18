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
            haruMarket_user_name: null,
            haruMarket_user_basicAddress: null,
            haruMarket_user_gender: null,
            dataStores: dataStore(),
            user_manager_updateModal: null,
            myModalInstance: null,
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.search = this.$refs.search;
            this.result = this.$refs.result;
            this.user_manager_updateModal = this.$refs.user_manager_updateModal;
            this.search.style.height = (screen.height / 5 + 0) + "px";
            this.result.style.height = (screen.height / 1.6 + 0) + "px";

            this.haruMarket_user_id = this.$refs.haruMarket_user_id;
            this.haruMarket_user_name = this.$refs.haruMarket_user_name;
            this.haruMarket_user_basicAddress = this.$refs.haruMarket_user_basicAddress;
            this.haruMarket_user_gender = this.$refs.haruMarket_user_gender;
        })

        this.firstGrid.setConfig({
            target: $('[data-ax5grid="first-grid"]'),
            columns: [
                { key: "haruMarket_user_id", label: "아이디" },
                { key: "haruMarket_user_postCode", label: "우편 번호" },
                { key: "haruMarket_user_basicAddress", label: "기본 주소", width: 200 },
                { key: "haruMarket_user_detailAddress", label: "상세 주소" },
                { key: "haruMarket_user_birthday", label: "생일" },
                { key: "haruMarket_user_gender", label: "성별" },
                { key: "haruMarket_user_name", label: "이름" },
                { key: "haruMarket_user_phone", label: "전화번호" },
                { key: "haruMarket_user_insertTime", label: "가입 시간", width: 170 },
                { key: "haruMarket_user_updateTime", label: "수정 시간", width: 170 },
                { key: "haruMarket_user_updateUserIndex", label: "수정 시도 계정" },
                { key: "haruMarket_user_role", label: "계정 권한" },
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

        this.myModalInstance = new bootstrap.Modal(this.user_manager_updateModal, {});
    },
    methods: {
        async searchF() {
            let req = {
                haruMarket_user_id: this.haruMarket_user_id ? this.haruMarket_user_id.value : '',
                haruMarket_user_name: this.haruMarket_user_name ? this.haruMarket_user_name.value : '',
                haruMarket_user_basicAddress: this.haruMarket_user_basicAddress ? this.haruMarket_user_basicAddress.value : '',
                haruMarket_user_gender: this.haruMarket_user_gender ? this.haruMarket_user_gender.value : '',
            }

            let responData = await httpRequest("POST", "https://back1.haru.company/admin/user_manager_search", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("POST", "https://back1.haru.company/admin/user_manager_search", req, this.dataStores.authorization);
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
        async update() {
            var checkedList = this.firstGrid.getList("selected");
            if (checkedList.length == 0 || checkedList.length > 1) {
                toastr.error('수정할 상품을 한개 선택하여 주십시오.');
                return;
            }

            var selectedRows = this.firstGrid.getList('selected');
            let haruMarket_user_index = selectedRows[0].haruMarket_user_index;

            let req = {
                haruMarket_user_index: Number(haruMarket_user_index),
            }

            let responData = await httpRequest("POST", "https://back1.haru.company/admin/user_manager_view", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("POST", "https://back1.haru.company/admin/user_manager_view", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                let res = responData.data;

                let haruMarket_user_id = this.$refs.updateForm.querySelector('input[name="haruMarket_user_id"]');
                haruMarket_user_id.value = res.haruMarket_user_id;

                let haruMarket_user_name = this.$refs.updateForm.querySelector('input[name="haruMarket_user_name"]');
                haruMarket_user_name.value = res.haruMarket_user_name;

                let haruMarket_user_gender = this.$refs.updateForm.querySelector('select[name="haruMarket_user_gender"]');
                haruMarket_user_gender.value = res.haruMarket_user_gender;

                let haruMarket_user_birthday = this.$refs.updateForm.querySelector('input[name="haruMarket_user_birthday"]');
                haruMarket_user_birthday.value = res.haruMarket_user_birthday;

                let haruMarket_user_phone = this.$refs.updateForm.querySelector('input[name="haruMarket_user_phone"]');
                haruMarket_user_phone.value = res.haruMarket_user_phone;

                let haruMarket_user_role = this.$refs.updateForm.querySelector('select[name="haruMarket_user_role"]');
                haruMarket_user_role.value = res.haruMarket_user_role;

                let haruMarket_user_postCode = this.$refs.updateForm.querySelector('input[name="haruMarket_user_postCode"]');
                haruMarket_user_postCode.value = res.haruMarket_user_postCode;

                let haruMarket_user_basicAddress = this.$refs.updateForm.querySelector('input[name="haruMarket_user_basicAddress"]');
                haruMarket_user_basicAddress.value = res.haruMarket_user_basicAddress;

                let haruMarket_user_detailAddress = this.$refs.updateForm.querySelector('input[name="haruMarket_user_detailAddress"]');
                haruMarket_user_detailAddress.value = res.haruMarket_user_detailAddress;

                this.myModalInstance = new bootstrap.Modal(this.user_manager_updateModal, {});
                this.myModalInstance.show();
            }
        },
        async update_process() {
            var selectedRows = this.firstGrid.getList('selected');

            const updateForm = new FormData(this.$refs.updateForm);
            let haruMarket_user_id = updateForm.get('haruMarket_user_id');
            let haruMarket_user_name = updateForm.get('haruMarket_user_name');
            let haruMarket_user_gender = updateForm.get('haruMarket_user_gender');
            let haruMarket_user_birthday = updateForm.get('haruMarket_user_birthday');
            let haruMarket_user_phone = updateForm.get('haruMarket_user_phone');
            //let haruMarket_user_postCode = updateForm.get('haruMarket_user_postCode');
            let haruMarket_user_postCodeNode = this.$refs.updateForm.querySelector('input[name="haruMarket_user_postCode"]');
            let haruMarket_user_postCode = haruMarket_user_postCodeNode.value;
            //let haruMarket_user_basicAddress = updateForm.get('haruMarket_user_basicAddress');
            let haruMarket_user_basicAddressNode = this.$refs.updateForm.querySelector('input[name="haruMarket_user_basicAddress"]');
            let haruMarket_user_basicAddress = haruMarket_user_basicAddressNode.value;
            let haruMarket_user_detailAddress = updateForm.get('haruMarket_user_detailAddress');
            let haruMarket_user_role = updateForm.get('haruMarket_user_role');

            if (haruMarket_user_id == "") {
                toastr.error('아이디를 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_user_id"]').focus();
                return;
            }
            if (!this.validataTest(haruMarket_user_id)) {
                toastr.error('아이디는 영소문자 또는 숫자만 포함하여 4~20자(20자) 입력하여주십시오.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_user_id"]').focus();
                return;
            }
            if (haruMarket_user_name == "") {
                toastr.error('이름을 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_user_name"]').focus();
                return;
            }
            if (haruMarket_user_gender == "") {
                toastr.error('성별을 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('select[name="haruMarket_user_gender"]').focus();
                return;
            }
            if (haruMarket_user_birthday == "") {
                toastr.error('생일을 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_user_birthday"]').focus();
                return;
            }
            if (haruMarket_user_phone == "") {
                toastr.error('핸드폰번호를 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_user_phone"]').focus();
                return;
            }
            if (!this.isNumber(haruMarket_user_phone)) {
                toastr.error('핸드폰번호는 숫자만 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_user_phone"]').focus();
                return;
            }
            if (haruMarket_user_phone == "") {
                toastr.error('핸드폰번호를 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_user_phone"]').focus();
                return;
            }
            if (haruMarket_user_role == "") {
                toastr.error('권한을 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[select="haruMarket_user_role"]').focus();
                return;
            }
            if (haruMarket_user_postCode == "" || haruMarket_user_basicAddress == "") {
                toastr.error('우편번호 버튼을 클릭하여 주소를 검색하여 주십시오.');
                return;
            }
            if (haruMarket_user_detailAddress == "") {
                toastr.error('상세 주소가 입력되지 않았습니다.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_user_detailAddress"]').focus();
                return;
            }
            if (haruMarket_user_detailAddress.length >= 30) {
                toastr.error('상세 주소는 30자를 넘지 않도록 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="haruMarket_user_detailAddress"]').focus();
                return;
            }

            var selectedRows = this.firstGrid.getList('selected');
            let haruMarket_user_index = selectedRows[0].haruMarket_user_index;

            let req = {
                haruMarket_user_index: haruMarket_user_index,
                haruMarket_user_id: haruMarket_user_id,
                haruMarket_user_name: haruMarket_user_name,
                haruMarket_user_gender: haruMarket_user_gender,
                haruMarket_user_birthday: haruMarket_user_birthday,
                haruMarket_user_phone: haruMarket_user_phone,
                haruMarket_user_postCode: haruMarket_user_postCode,
                haruMarket_user_basicAddress: haruMarket_user_basicAddress,
                haruMarket_user_detailAddress: haruMarket_user_detailAddress,
                haruMarket_user_role: haruMarket_user_role,
            }

            let responData = await httpRequest("PATCH", "https://back1.haru.company/admin/user_manager_update", req, this.dataStores.authorization);
            if (responData.status == 500) {
                toastr.success("이미 존재하는 아이디입니다. 다른 아이디를 입력하여 주십시오.");
                this.myModalInstance.hide();
                await this.searchF();
            }
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("PATCH", "https://back1.haru.company/admin/user_manager_update", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                toastr.success("회원 정보가 수정되었습니다.");
                this.myModalInstance.hide();
                await this.searchF();
            }
        },
        validataTest(text) {
            const regex = /^[a-z0-9]{1,20}$/;
            return regex.test(text);
        },
        isNumber(text) {
            return !isNaN(text);
        },
        address_search() {
            let updateForm = this.$refs.updateForm;
            new window.daum.Postcode({
                oncomplete: function (data) {
                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var jibunAddress = data.jibunAddress; // 지번 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraRoadAddr !== '') {
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    let haruMarket_user_postCode = updateForm.querySelector('input[name="haruMarket_user_postCode"]');
                    haruMarket_user_postCode.value = data.zonecode;

                    let haruMarket_user_basicAddress = updateForm.querySelector('input[name="haruMarket_user_basicAddress"]');
                    haruMarket_user_basicAddress.value = data.jibunAddress;
                }
            }).open();
        }
    }
}
</script>
<template>
    <div class="container-fluid h-100 w-100 p-0 m-0">
        <navComponent category="user" category_detail="user_manager" />
        <div class="row">
            <div class="col-12 pb-0" ref="search">
                <div class="card h-100">
                    <div class="card-header">
                        유저 관리
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
                                            <span class="input-group-text" id="basic-addon1">이름</span>
                                            <input ref="haruMarket_user_name" type="text" class="form-control"
                                                placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                                style="height:31px;">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <span class="input-group-text" id="basic-addon1">주소</span>
                                            <input ref="haruMarket_user_basicAddress" type="text" class="form-control"
                                                placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                                style="height:31px;">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">성별</label>
                                            <select ref="haruMarket_user_gender" class="form-select"
                                                style="height:31px;">
                                                <option value="" selected>선택</option>
                                                <option value="male">남자</option>
                                                <option value="female">여자</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="position-absolute bottom-0 w-100 p-1">
                                <button class="btn btn-primary btn-sm me-1" type="button" @click="searchF">조회</button>
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

    <!-- 수정 모달창 -->
    <form ref="updateForm">
        <div class="modal" tabindex="-1" ref="user_manager_updateModal">
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">유저 정보 수정</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid pt-1">
                            <div class="row">
                                <div class="col-3">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">아이디</span>
                                        <input name="haruMarket_user_id" type="text" class="form-control" placeholder=""
                                            aria-label="Username" aria-describedby="basic-addon1" style="height:31px;">
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">이름</span>
                                        <input name="haruMarket_user_name" type="text" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="input-group input-group-sm">
                                        <label class="input-group-text" for="inputGroupSelect01">성별</label>
                                        <select name="haruMarket_user_gender" class="form-select" style="height:31px;">
                                            <option value="" selected>선택</option>
                                            <option value="male">남자</option>
                                            <option value="female">여자</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">생일</span>
                                        <input name="haruMarket_user_birthday" type="date" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">핸드폰 번호</span>
                                        <input name="haruMarket_user_phone" type="text" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="input-group input-group-sm">
                                        <label class="input-group-text" for="inputGroupSelect01">권한</label>
                                        <select name="haruMarket_user_role" class="form-select" style="height:31px;">
                                            <option value="" selected>선택</option>
                                            <option value="사용자">사용자</option>
                                            <option value="관리자">관리자</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <label class="form-label mt-3">주소</label>
                            <div class="row">
                                <div class="col-3">
                                    <div class="input-group input-group-sm">
                                        <input name="haruMarket_user_postCode" type="text" class="form-control"
                                            placeholder="우편 번호" style="height:31px;" disabled readonly>
                                        <button class="btn btn-outline-secondary" type="button" @click="address_search"
                                            style="height:31px;">검색</button>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <input name="haruMarket_user_basicAddress" type="text" class="form-control"
                                            placeholder="기본 주소" style="height:31px;" disabled readonly>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="input-group input-group-sm">
                                        <input name="haruMarket_user_detailAddress" type="text" class="form-control"
                                            placeholder="상세 주소" style="height:31px;">
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