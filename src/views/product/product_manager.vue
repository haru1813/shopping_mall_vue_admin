<script>
import navComponent from '@/components/nav.vue';
import { dataStore } from '@/stores/dataStore';
import { httpRequest } from '@/tool.js';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
export default {
    components: {
        navComponent
    },
    data: function () {
        return {
            search: null,
            result: null,
            firstGrid: new ax5.ui.grid(),
            harumarket_product_view: null,
            haruMarket_productCategory_index: null,
            harumarket_product_name: null,
            harumarket_product_colorView: null,
            harumarket_product_sizeView: null,
            harumarket_product_colorIndexs: null,
            harumarket_product_sizeIndexs: null,
            harumarket_product_originPrice_min: null,
            harumarket_product_originPrice_max: null,
            harumarket_product_salePrice_min: null,
            harumarket_product_salePrice_max: null,
            harumarket_product_advertiseView: null,
            haruMarket_productCategory_Datas: null,
            harumarket_product_colorDatas: null,
            harumarket_product_sizeDatas: null,
            dataStores: dataStore(),
            product_manager_insertModal: null,
            product_manager_updateModal: null,
            myModalInstance: null,
            harumarket_productColor_if: null,
            harumarket_productSize_if: null,
            harumarket_product_picture_if: null,
            harumarket_product_content_if: null,

            harumarket_productColor_uf: null,
            harumarket_productSize_uf: null,
            harumarket_product_picture_uf: null,
            harumarket_product_content_uf: null,
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.search = this.$refs.search;
            this.result = this.$refs.result;
            this.product_manager_insertModal = this.$refs.product_manager_insertModal;
            this.product_manager_updateModal = this.$refs.product_manager_updateModal;
            this.search.style.height = (screen.height / 5 + 0) + "px";
            this.result.style.height = (screen.height / 1.6 + 0) + "px";

            this.harumarket_product_view = this.$refs.harumarket_product_view;
            this.haruMarket_productCategory_index = this.$refs.haruMarket_productCategory_index;
            this.harumarket_product_name = this.$refs.harumarket_product_name;
            this.harumarket_product_colorView = this.$refs.harumarket_product_colorView;
            this.harumarket_product_sizeView = this.$refs.harumarket_product_sizeView;
            this.harumarket_product_colorIndexs = this.$refs.harumarket_product_colorIndexs;
            this.harumarket_product_sizeIndexs = this.$refs.harumarket_product_sizeIndexs;
            this.harumarket_product_originPrice_min = this.$refs.harumarket_product_originPrice_min;
            this.harumarket_product_originPrice_max = this.$refs.harumarket_product_originPrice_max;
            this.harumarket_product_salePrice_min = this.$refs.harumarket_product_salePrice_min;
            this.harumarket_product_salePrice_max = this.$refs.harumarket_product_salePrice_max;
            this.harumarket_product_advertiseView = this.$refs.harumarket_product_advertiseView;
            this.haruMarket_productCategory_Datas = this.$refs.haruMarket_productCategory_Datas;
            this.harumarket_product_colorDatas = this.$refs.harumarket_product_colorDatas;
            this.harumarket_product_sizeDatas = this.$refs.harumarket_product_sizeDatas;

            this.harumarket_productColor_if = this.$refs.harumarket_productColor_if;
            this.harumarket_productSize_if = this.$refs.harumarket_productSize_if;

            this.harumarket_product_picture_if = this.$refs.harumarket_product_picture_if;
            this.harumarket_product_content_if = this.$refs.harumarket_product_content_if;
            new Editor({
                el: this.harumarket_product_picture_if,
                previewStyle: 'vertical',
                initialEditType: 'wysiwyg',
                height: '50vh',
                initialValue: ""
            })
            new Editor({
                el: this.harumarket_product_content_if,
                previewStyle: 'vertical',
                initialEditType: 'wysiwyg',
                height: '75vh',
                initialValue: ""
            })

            this.harumarket_productColor_uf = this.$refs.harumarket_productColor_uf;
            this.harumarket_productSize_uf = this.$refs.harumarket_productSize_uf;

            this.harumarket_product_picture_uf = this.$refs.harumarket_product_picture_uf;
            this.harumarket_product_content_uf = this.$refs.harumarket_product_content_uf;
            new Editor({
                el: this.harumarket_product_picture_uf,
                previewStyle: 'vertical',
                initialEditType: 'wysiwyg',
                height: '50vh',
                initialValue: ""
            })
            new Editor({
                el: this.harumarket_product_content_uf,
                previewStyle: 'vertical',
                initialEditType: 'wysiwyg',
                height: '75vh',
                initialValue: ""
            })

            this.myModalInstance = new bootstrap.Modal(this.product_manager_updateModal, {});
        })

        this.firstGrid.setConfig({
            target: $('[data-ax5grid="first-grid"]'),
            columns: [
                { key: "harumarket_product_index", label: "인덱스" },
                { key: "haruMarket_productCategory_name", label: "카테고리 이름", width: 100 },
                { key: "harumarket_product_name", label: "상품 이름", width: 250 },
                { key: "harumarket_product_originPrice", label: "상품 가격" },
                { key: "harumarket_product_salePrice", label: "상품 할인 가격" },
                { key: "harumarket_product_view", label: "상품 화면 노출 여부", width: 120 },
                { key: "harumarket_product_advertiseView", label: "상품 광고 노출 여부", width: 120 },
                { key: "harumarket_product_colorView", label: "상품 색상 노출 여부", width: 120 },
                { key: "harumarket_product_colorIndexs", label: "상품 색상", width: 200 },
                { key: "harumarket_product_sizeView", label: "상품 크기 노출 여부", width: 120 },
                { key: "harumarket_product_sizeIndexs", label: "상품 크기", width: 200 },
                { key: "harumarket_product_insertTime", label: "등록 시간", width: 170 },
                { key: "harumarket_product_insertUserIndex", label: "등록 시도 계정" },
                { key: "harumarket_product_updateTime", label: "수정 시간", width: 170 },
                { key: "harumarket_product_updateUserIndex", label: "수정 시도 계정" },
            ],
            header: {
                align: "center",
                selector: false,
            },
            showLineNumber: true,
            showRowSelector: true,
            multipleSelect: false
        });

        let req = {
            harumarket_productSize_name: '',
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
            this.harumarket_product_sizeDatas = responData.data;
        }

        req = {
            harumarket_productColor_name: '',
        }

        responData = await httpRequest("POST", "https://back1.haru.company/admin/productColor_manager_search", req, this.dataStores.authorization);
        if (responData.status != 200) {
            responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
            if (responData.status == 200) {
                this.dataStores.authorization = responData.data.token;
                responData = await httpRequest("POST", "https://back1.haru.company/admin/productColor_manager_search", req, this.dataStores.authorization);
            }
            else {
                toastr.error("로그아웃 되었습니다.");
                this.dataStores.authorization = "";
                this.$router.replace('/');
            }
        }
        else {
            this.harumarket_product_colorDatas = responData.data;
        }

        req = {
            haruMarket_productCategory_name: '',
            haruMarket_productCategory_view: '',
        }

        responData = await httpRequest("POST", "https://back1.haru.company/admin/category_manager_search", req, this.dataStores.authorization);
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
            this.haruMarket_productCategory_Datas = responData.data;
        }

        await this.searchF();

        //this.myModalInstance = new bootstrap.Modal(this.productSize_manager_updateModal, {});
    },
    methods: {
        async searchF() {
            let req = {
                harumarket_product_view: this.harumarket_product_view ? this.harumarket_product_view.value : '',
                haruMarket_productCategory_index: this.haruMarket_productCategory_index ? this.haruMarket_productCategory_index.value : '',
                harumarket_product_name: this.harumarket_product_name ? this.harumarket_product_name.value : '',
                harumarket_product_colorView: this.harumarket_product_colorView ? this.harumarket_product_colorView.value : '',
                harumarket_product_sizeView: this.harumarket_product_sizeView ? this.harumarket_product_sizeView.value : '',
                harumarket_product_colorIndexs: this.harumarket_product_colorIndexs ? this.harumarket_product_colorIndexs.value : '',
                harumarket_product_sizeIndexs: this.harumarket_product_sizeIndexs ? this.harumarket_product_sizeIndexs.value : '',
                harumarket_product_originPrice_min: this.harumarket_product_originPrice_min ? this.harumarket_product_originPrice_min.value : '',
                harumarket_product_originPrice_max: this.harumarket_product_originPrice_max ? this.harumarket_product_originPrice_max.value : '',
                harumarket_product_salePrice_min: this.harumarket_product_salePrice_min ? this.harumarket_product_salePrice_min.value : '',
                harumarket_product_salePrice_max: this.harumarket_product_salePrice_max ? this.harumarket_product_salePrice_max.value : '',
                harumarket_product_advertiseView: this.harumarket_product_advertiseView ? this.harumarket_product_advertiseView.value : '',
            }

            let responData = await httpRequest("POST", "https://back1.haru.company/admin/productManager_search", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("POST", "https://back1.haru.company/admin/productManager_search", req, this.dataStores.authorization);
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
            var myModal = new bootstrap.Modal(this.product_manager_insertModal, {});
            myModal.show();
        },
        async insert_process() {
            const insertForm = new FormData(this.$refs.insertForm);

            let harumarket_product_view = 0;
            if (insertForm.get('harumarket_product_view') == null) {
                harumarket_product_view = 0;
            }
            else {
                harumarket_product_view = 1;
            }

            let harumarket_product_advertiseView = 0;
            if (insertForm.get('harumarket_product_advertiseView') == null) {
                harumarket_product_advertiseView = 0;
            }
            else {
                harumarket_product_advertiseView = 1;
            }

            let haruMarket_productCategory_index = insertForm.get('haruMarket_productCategory_index');

            if (haruMarket_productCategory_index == "") {
                toastr.error('카테고리를 선택하여 주십시오.');
                this.$refs.insertForm.querySelector('select[name="haruMarket_productCategory_index"]').focus();
                return;
            }

            let harumarket_product_name = insertForm.get('harumarket_product_name');
            if (harumarket_product_name == "") {
                toastr.error('상품 이름을 입력하여 주십시오.');
                this.$refs.insertForm.querySelector('input[name="harumarket_product_name"]').focus();
                return;
            }
            if (harumarket_product_name.length > 100) {
                toastr.error('상품 이름은 100자 밑으로 입력하여 주십시오.');
                this.$refs.insertForm.querySelector('input[name="harumarket_product_name"]').focus();
                return;
            }

            let harumarket_product_originPrice = insertForm.get('harumarket_product_originPrice');
            if (harumarket_product_originPrice == "") {
                toastr.error('상품 가격을 입력하여 주십시오.');
                this.$refs.insertForm.querySelector('input[name="harumarket_product_originPrice"]').focus();
                return;
            }
            let harumarket_product_salePrice = insertForm.get('harumarket_product_salePrice');
            if (harumarket_product_salePrice == "") {
                toastr.error('상품 가격을 입력하여 주십시오.');
                this.$refs.insertForm.querySelector('input[name="harumarket_product_salePrice"]').focus();
                return;
            }

            let harumarket_product_colorView = 0;
            if (insertForm.get('harumarket_product_colorView') == null) {
                harumarket_product_colorView = 0;
            }
            else {
                harumarket_product_colorView = 1;
            }

            let harumarket_product_sizeView = 0;
            if (insertForm.get('harumarket_product_sizeView') == null) {
                harumarket_product_sizeView = 0;
            }
            else {
                harumarket_product_sizeView = 1;
            }

            if (insertForm.get('harumarket_product_colorViewI') == null &&
                insertForm.get('harumarket_product_sizeViewI') == null) {
                toastr.error('상품 색상이나 크기 둘 중에 하나는 선택하여 주십시오.');
                return;
            }

            let harumarket_product_colorIndexs = "";
            if (harumarket_product_colorView == 1) {
                const checkboxes = this.harumarket_productColor_if.querySelectorAll('input[type="checkbox"]:checked');
                const checkedValues = [];
                checkboxes.forEach(checkbox => {
                    checkedValues.push(checkbox.value);
                });

                harumarket_product_colorIndexs = `{${checkedValues.join(',')}}`;
            }
            if(harumarket_product_colorView==1 && harumarket_product_colorIndexs=="{}"){
                toastr.error('상품 색상의 종류를 선택하여 주십시오.');
                return;
            }

            let harumarket_product_sizeIndexs = "";
            if (harumarket_product_sizeView == 1) {
                const checkboxes = this.harumarket_productSize_if.querySelectorAll('input[type="checkbox"]:checked');
                const checkedValues = [];
                checkboxes.forEach(checkbox => {
                    checkedValues.push(checkbox.value);
                });

                harumarket_product_sizeIndexs = `{${checkedValues.join(',')}}`;
            }
            if(harumarket_product_sizeView==1 && harumarket_product_sizeIndexs=="{}"){
                toastr.error('상품 크기의 종류를 선택하여 주십시오.');
                return;
            }

            
            let harumarket_product_picture = this.harumarket_product_picture_if.querySelector('.ProseMirror.toastui-editor-contents').innerHTML;
            // if(this.getProseMirrorPTagHTML(this.harumarket_product_picture_if).trim().includes("ProseMirror-trailingBreak")){
            //     toastr.error('상품 사진을 등록하여 주십시오.');
            //     return;
            // }
            
            let harumarket_product_content = this.harumarket_product_content_if.querySelector('.ProseMirror.toastui-editor-contents').innerHTML;
            // if(this.getProseMirrorPTagHTML(this.harumarket_product_content_if).trim().includes("ProseMirror-trailingBreak")){
            //     toastr.error('상품 상세 설명을 작성하여 주십시오.');
            //     return;
            // }

            let req = {
                haruMarket_productCategory_index: haruMarket_productCategory_index,
                harumarket_product_name: harumarket_product_name,
                harumarket_product_colorView: harumarket_product_colorView,
                harumarket_product_sizeView: harumarket_product_sizeView,
                harumarket_product_colorIndexs: harumarket_product_colorIndexs,
                harumarket_product_sizeIndexs: harumarket_product_sizeIndexs,
                harumarket_product_picture: harumarket_product_picture,
                harumarket_product_content: harumarket_product_content,
                harumarket_product_view: harumarket_product_view,
                harumarket_product_originPrice: harumarket_product_originPrice,
                harumarket_product_salePrice: harumarket_product_salePrice,
                harumarket_product_advertiseView: harumarket_product_advertiseView
            }

            let responData = await httpRequest("PUT", "https://back1.haru.company/admin/productManager_insert", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("PUT", "https://back1.haru.company/admin/productManager_insert", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                toastr.success("상품을 등록하였습니다.");
                await this.searchF();
            }
        },
        async update() {
            var checkedList = this.firstGrid.getList("selected");
            if (checkedList.length == 0 || checkedList.length > 1) {
                toastr.error('수정할 상품을 한개 선택하여 주십시오.');
                return;
            }

            var selectedRows = this.firstGrid.getList('selected');
            let harumarket_product_index = selectedRows[0].harumarket_product_index;

            let req = {
                harumarket_product_index: Number(harumarket_product_index),
            }

            let responData = await httpRequest("POST", "https://back1.haru.company/admin/productManager_view", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("POST", "https://back1.haru.company/admin/productManager_view", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                let res = responData.data;
                console.log(res);
                if(res.harumarket_product_view=="노출"){
                    this.$refs.updateForm.querySelector('input[type="checkbox"][name="harumarket_product_view"]').checked = true;
                }
                else{
                    this.$refs.updateForm.querySelector('input[type="checkbox"][name="harumarket_product_view"]').checked = false;
                }

                if(res.harumarket_product_advertiseView=="노출"){
                    this.$refs.updateForm.querySelector('input[type="checkbox"][name="harumarket_product_advertiseView"]').checked = true;
                }
                else{
                    this.$refs.updateForm.querySelector('input[type="checkbox"][name="harumarket_product_advertiseView"]').checked = false;
                }

                this.$refs.updateForm.querySelector('select[name="haruMarket_productCategory_index"]').value = res.haruMarket_productCategory_index;
                this.$refs.updateForm.querySelector('input[name="harumarket_product_name"]').value = res.harumarket_product_name;
                this.$refs.updateForm.querySelector('input[name="harumarket_product_originPrice"]').value = res.harumarket_product_originPrice;
                this.$refs.updateForm.querySelector('input[name="harumarket_product_salePrice"]').value = res.harumarket_product_salePrice;

                if(res.harumarket_product_colorView=="노출"){
                    this.$refs.updateForm.querySelector('input[type="checkbox"][name="harumarket_product_colorViewU"]').checked = true;
                    this.harumarket_productColor_uf.style.visibility = 'visible';
                    const checkboxes = this.harumarket_productColor_uf.querySelectorAll('input[type="checkbox"]');

                    let arr = res.harumarket_product_colorIndexs.slice(1, -1).split(',');
                    arr.forEach(function(harumarket_productColor_index) {
                        checkboxes.forEach(checkbox => {
                            if(checkbox.value == harumarket_productColor_index){
                                checkbox.checked = true;
                            }
                        });
                    });
                }
                if(res.harumarket_product_sizeView=="노출"){
                    this.$refs.updateForm.querySelector('input[type="checkbox"][name="harumarket_product_sizeViewU"]').checked = true;
                    this.harumarket_productSize_uf.style.visibility = 'visible';
                    const checkboxes = this.harumarket_productSize_uf.querySelectorAll('input[type="checkbox"]');

                    let arr = res.harumarket_product_sizeIndexs.slice(1, -1).split(',');
                    arr.forEach(function(harumarket_product_sizeIndexs) {
                        checkboxes.forEach(checkbox => {
                            if(checkbox.value == harumarket_product_sizeIndexs){
                                checkbox.checked = true;
                            }
                        });
                    });
                }

                this.harumarket_product_picture_uf.querySelector('.ProseMirror.toastui-editor-contents').innerHTML=res.harumarket_product_picture;
                this.harumarket_product_content_uf.querySelector('.ProseMirror.toastui-editor-contents').innerHTML=res.harumarket_product_content;

                this.myModalInstance = new bootstrap.Modal(this.product_manager_updateModal, {});
                this.myModalInstance.show();
            }
        },
        async update_process() {
            const updateForm = new FormData(this.$refs.updateForm);

            let harumarket_product_view = 0;
            if (updateForm.get('harumarket_product_view') == null) {
                harumarket_product_view = 0;
            }
            else {
                harumarket_product_view = 1;
            }

            let harumarket_product_advertiseView = 0;
            if (updateForm.get('harumarket_product_advertiseView') == null) {
                harumarket_product_advertiseView = 0;
            }
            else {
                harumarket_product_advertiseView = 1;
            }

            let haruMarket_productCategory_index = updateForm.get('haruMarket_productCategory_index');

            if (haruMarket_productCategory_index == "") {
                toastr.error('카테고리를 선택하여 주십시오.');
                this.$refs.updateForm.querySelector('select[name="haruMarket_productCategory_index"]').focus();
                return;
            }

            let harumarket_product_name = updateForm.get('harumarket_product_name');
            if (harumarket_product_name == "") {
                toastr.error('상품 이름을 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="harumarket_product_name"]').focus();
                return;
            }
            if (harumarket_product_name.length > 100) {
                toastr.error('상품 이름은 100자 밑으로 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="harumarket_product_name"]').focus();
                return;
            }

            let harumarket_product_originPrice = updateForm.get('harumarket_product_originPrice');
            if (harumarket_product_originPrice == "") {
                toastr.error('상품 가격을 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="harumarket_product_originPrice"]').focus();
                return;
            }
            let harumarket_product_salePrice = updateForm.get('harumarket_product_salePrice');
            if (harumarket_product_salePrice == "") {
                toastr.error('상품 가격을 입력하여 주십시오.');
                this.$refs.updateForm.querySelector('input[name="harumarket_product_salePrice"]').focus();
                return;
            }

            let harumarket_product_colorView = 0;
            if (updateForm.get('harumarket_product_colorViewU') == null) {
                harumarket_product_colorView = 0;
            }
            else {
                harumarket_product_colorView = 1;
            }

            let harumarket_product_sizeView = 0;
            if (updateForm.get('harumarket_product_sizeViewU') == null) {
                harumarket_product_sizeView = 0;
            }
            else {
                harumarket_product_sizeView = 1;
            }

            if (updateForm.get('harumarket_product_colorViewU') == null &&
                updateForm.get('harumarket_product_sizeViewU') == null) {
                toastr.error('상품 색상이나 크기 둘 중에 하나는 선택하여 주십시오.');
                return;
            }

            let harumarket_product_colorIndexs = "";
            if (harumarket_product_colorView == 1) {
                const checkboxes = this.harumarket_productColor_uf.querySelectorAll('input[type="checkbox"]:checked');
                const checkedValues = [];
                checkboxes.forEach(checkbox => {
                    checkedValues.push(checkbox.value);
                });

                harumarket_product_colorIndexs = `{${checkedValues.join(',')}}`;
            }
            if(harumarket_product_colorView==1 && harumarket_product_colorIndexs=="{}"){
                toastr.error('상품 색상의 종류를 선택하여 주십시오.');
                return;
            }

            let harumarket_product_sizeIndexs = "";
            if (harumarket_product_sizeView == 1) {
                const checkboxes = this.harumarket_productSize_uf.querySelectorAll('input[type="checkbox"]:checked');
                const checkedValues = [];
                checkboxes.forEach(checkbox => {
                    checkedValues.push(checkbox.value);
                });

                harumarket_product_sizeIndexs = `{${checkedValues.join(',')}}`;
            }
            if(harumarket_product_sizeView==1 && harumarket_product_sizeIndexs=="{}"){
                toastr.error('상품 크기의 종류를 선택하여 주십시오.');
                return;
            }


            let harumarket_product_picture = this.harumarket_product_picture_uf.querySelector('.ProseMirror.toastui-editor-contents').innerHTML;
            // if(this.getProseMirrorPTagHTML(this.harumarket_product_picture_if).trim().includes("ProseMirror-trailingBreak")){
            //     toastr.error('상품 사진을 등록하여 주십시오.');
            //     return;
            // }
            
            let harumarket_product_content = this.harumarket_product_content_uf.querySelector('.ProseMirror.toastui-editor-contents').innerHTML;
            // if(this.getProseMirrorPTagHTML(this.harumarket_product_content_if).trim().includes("ProseMirror-trailingBreak")){
            //     toastr.error('상품 상세 설명을 작성하여 주십시오.');
            //     return;
            // }

            var selectedRows = this.firstGrid.getList('selected');
            let harumarket_product_index = selectedRows[0].harumarket_product_index;

            let req = {
                haruMarket_productCategory_index: haruMarket_productCategory_index,
                harumarket_product_name: harumarket_product_name,
                harumarket_product_colorView: harumarket_product_colorView,
                harumarket_product_sizeView: harumarket_product_sizeView,
                harumarket_product_colorIndexs: harumarket_product_colorIndexs,
                harumarket_product_sizeIndexs: harumarket_product_sizeIndexs,
                harumarket_product_picture: harumarket_product_picture,
                harumarket_product_content: harumarket_product_content,
                harumarket_product_view: harumarket_product_view,
                harumarket_product_originPrice: harumarket_product_originPrice,
                harumarket_product_salePrice: harumarket_product_salePrice,
                harumarket_product_advertiseView: harumarket_product_advertiseView,
                harumarket_product_index : harumarket_product_index
            }

            console.log(req);

            let responData = await httpRequest("PATCH", "https://back1.haru.company/admin/productManager_update", req, this.dataStores.authorization);
            if (responData.status != 200) {
                responData = await httpRequest("POST", "https://back1.haru.company/common/token_refresh", null, this.dataStores.authorization);
                if (responData.status == 200) {
                    this.dataStores.authorization = responData.data.token;
                    responData = await httpRequest("PATCH", "https://back1.haru.company/admin/productManager_update", req, this.dataStores.authorization);
                }
                else {
                    toastr.error("로그아웃 되었습니다.");
                    this.dataStores.authorization = "";
                    this.$router.replace('/');
                }
            }
            else {
                toastr.success("상품이 수정되었습니다.");
                this.myModalInstance.hide();
                await this.searchF();
            }
        },
        list_view(e) {
            if (e.target.name == "harumarket_product_colorViewI" && e.target.checked) {
                this.harumarket_productColor_if.style.visibility = 'visible';
            }
            else if (e.target.name == "harumarket_product_colorViewI" && !e.target.checked) {
                this.harumarket_productColor_if.style.visibility = 'hidden';
            }
            if (e.target.name == "harumarket_product_sizeViewI" && e.target.checked) {
                this.harumarket_productSize_if.style.visibility = 'visible';
            }
            else if (e.target.name == "harumarket_product_sizeViewI" && !e.target.checked) {
                this.harumarket_productSize_if.style.visibility = 'hidden';
            }

            if (e.target.name == "harumarket_product_colorViewU" && e.target.checked) {
                this.harumarket_productColor_uf.style.visibility = 'visible';
            }
            else if (e.target.name == "harumarket_product_colorViewU" && !e.target.checked) {
                this.harumarket_productColor_uf.style.visibility = 'hidden';
            }
            if (e.target.name == "harumarket_product_sizeViewU" && e.target.checked) {
                this.harumarket_productSize_uf.style.visibility = 'visible';
            }
            else if (e.target.name == "harumarket_product_sizeViewU" && !e.target.checked) {
                this.harumarket_productSize_uf.style.visibility = 'hidden';
            }
        },
        getProseMirrorPTagHTML(targetNode) {
            const proseMirrorContent = targetNode.querySelector('.ProseMirror.toastui-editor-contents');

            if (proseMirrorContent) {
                const pTag = proseMirrorContent.querySelector('p'); // p 태그 하나만 선택

                if (pTag) {
                    return pTag.innerHTML; // p 태그의 innerHTML 반환
                } else {
                    return ""; // p 태그가 없으면 빈 문자열 반환
                }
            } else {
                return ""; // ProseMirror 콘텐츠가 없으면 빈 문자열 반환
            }
        }
    }
}
</script>
<template>
    <div class="container-fluid h-100 w-100 p-0 m-0">
        <navComponent category="product" category_detail="product_manager" />
        <div class="row">
            <div class="col-12 pb-0" ref="search">
                <div class="card h-100">
                    <div class="card-header">
                        상품 관리
                    </div>
                    <div class="card-body p-0">
                        <div class="card-title h-100">
                            <div class="container-fluid pt-1">
                                <div class="row">
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">상품 화면 노출 여부</label>
                                            <select ref="harumarket_product_view" class="form-select"
                                                style="height:31px;">
                                                <option value="" selected>선택</option>
                                                <option value="1">노출</option>
                                                <option value="0">비노출</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">카테고리</label>
                                            <select ref="haruMarket_productCategory_index" class="form-select"
                                                style="height:31px;">
                                                <option value="" selected>선택</option>
                                                <option v-for="(data, index) in haruMarket_productCategory_Datas"
                                                    :key="data.haruMarket_productCategory_index"
                                                    :value="data.haruMarket_productCategory_index">
                                                    {{ data.haruMarket_productCategory_name }}
                                                </option>
                                            </select>
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
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">상품 색상 노출 여부</label>
                                            <select ref="harumarket_product_colorView" class="form-select"
                                                style="height:31px;">
                                                <option value="" selected>선택</option>
                                                <option value="1">노출</option>
                                                <option value="0">비노출</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">상품 사이즈 노출
                                                여부</label>
                                            <select ref="harumarket_product_sizeView" class="form-select"
                                                style="height:31px;">
                                                <option value="" selected>선택</option>
                                                <option value="1">노출</option>
                                                <option value="0">비노출</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">상품 색상</label>
                                            <select ref="harumarket_product_colorIndexs" class="form-select"
                                                style="height:31px;">
                                                <option value="" selected>선택</option>
                                                <option v-for="(data, index) in harumarket_product_colorDatas"
                                                    :key="data.harumarket_productColor_index"
                                                    :value="data.harumarket_productColor_index">
                                                    {{ data.harumarket_productColor_name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">상품 크기</label>
                                            <select ref="harumarket_product_sizeIndexs" class="form-select"
                                                style="height:31px;">
                                                <option value="" selected>선택</option>
                                                <option v-for="(data, index) in harumarket_product_sizeDatas"
                                                    :key="data.harumarket_productSize_index"
                                                    :value="data.harumarket_productSize_index">
                                                    {{ data.harumarket_productSize_name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">상품 가격</label>
                                            <input ref="harumarket_product_originPrice_min" type="number"
                                                aria-label="First name" class="form-control" style="height:31px;"
                                                placeholder="상품 최소 가격">
                                            <input ref="harumarket_product_originPrice_max" type="number"
                                                aria-label="Last name" class="form-control" style="height:31px;"
                                                placeholder="상품 최대 가격">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">상품 할인 가격</label>
                                            <input ref="harumarket_product_salePrice_min" type="number"
                                                aria-label="First name" class="form-control" style="height:31px;"
                                                placeholder="상품 할인 최소 가격">
                                            <input ref="harumarket_product_salePrice_max" type="number"
                                                aria-label="Last name" class="form-control" style="height:31px;"
                                                placeholder="상품 할인 최대 가격">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-group input-group-sm">
                                            <label class="input-group-text" for="inputGroupSelect01">상품 광고 노출 여부</label>
                                            <select ref="harumarket_product_advertiseView" class="form-select"
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
        <div class="modal" tabindex="-1" ref="product_manager_insertModal">
            <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">상품 등록</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid pt-1">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check mt-3">
                                        <input class="form-check-input" type="checkbox" value=""
                                            name="harumarket_product_view">
                                        <label class="form-check-label" for="harumarket_product_view">
                                            상품 화면 노출 여부
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value=""
                                            name="harumarket_product_advertiseView">
                                        <label class="form-check-label" for="harumarket_product_advertiseView">
                                            상품 광고 노출 여부
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <label class="input-group-text" for="inputGroupSelect01">카테고리</label>
                                        <select name="haruMarket_productCategory_index" class="form-select"
                                            style="height:31px;">
                                            <option value="" selected>선택</option>
                                            <option v-for="(data, index) in haruMarket_productCategory_Datas"
                                                :key="data.haruMarket_productCategory_index"
                                                :value="data.haruMarket_productCategory_index">
                                                {{ data.haruMarket_productCategory_name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">상품 이름</span>
                                        <input name="harumarket_product_name" type="text" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">상품 가격</span>
                                        <input name="harumarket_product_originPrice" type="int" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">상품 할인 가격</span>
                                        <input name="harumarket_product_salePrice" type="int" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check mt-3">
                                        <input class="form-check-input" type="checkbox" value="1"
                                            name="harumarket_product_colorViewI" @change="list_view">
                                        <label class="form-check-label" for="harumarket_product_colorView">
                                            상품 색상
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <ul class="list-group list-group-horizontal" ref="harumarket_productColor_if"
                                        style="visibility: hidden;">
                                        <li class="list-group-item"
                                            v-for="(data, index) in harumarket_product_colorDatas">
                                            <div class="form-check mb-0">
                                                <input class="form-check-input" type="checkbox"
                                                    :value="data.harumarket_productColor_index">
                                                <label class="form-check-label mb-0">
                                                    {{ data.harumarket_productColor_name }}
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check mt-3">
                                        <input class="form-check-input" type="checkbox" value=""
                                            name="harumarket_product_sizeViewI" @change="list_view">
                                        <label class="form-check-label" for="harumarket_product_sizeView">
                                            상품 크기
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <ul class="list-group list-group-horizontal" ref="harumarket_productSize_if"
                                        style="visibility: hidden;">
                                        <li class="list-group-item"
                                            v-for="(data, index) in harumarket_product_sizeDatas">
                                            <div class="form-check mb-0">
                                                <input class="form-check-input" type="checkbox"
                                                    :value="data.harumarket_productSize_index">
                                                <label class="form-check-label mb-0">
                                                    {{ data.harumarket_productSize_name }}
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <label class="form-label mt-3">상품 사진</label>
                                    <div ref="harumarket_product_picture_if"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <label class="form-label mt-3">상품 상세</label>
                                    <div ref="harumarket_product_content_if"></div>
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
        <div class="modal" tabindex="-1" ref="product_manager_updateModal">
            <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">상품 수정</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid pt-1">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check mt-3">
                                        <input class="form-check-input" type="checkbox" value=""
                                            name="harumarket_product_view">
                                        <label class="form-check-label" for="harumarket_product_view">
                                            상품 화면 노출 여부
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value=""
                                            name="harumarket_product_advertiseView">
                                        <label class="form-check-label" for="harumarket_product_advertiseView">
                                            상품 광고 노출 여부
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <label class="input-group-text" for="inputGroupSelect01">카테고리</label>
                                        <select name="haruMarket_productCategory_index" class="form-select"
                                            style="height:31px;">
                                            <option value="" selected>선택</option>
                                            <option v-for="(data, index) in haruMarket_productCategory_Datas"
                                                :key="data.haruMarket_productCategory_index"
                                                :value="data.haruMarket_productCategory_index">
                                                {{ data.haruMarket_productCategory_name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">상품 이름</span>
                                        <input name="harumarket_product_name" type="text" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">상품 가격</span>
                                        <input name="harumarket_product_originPrice" type="int" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-text" id="basic-addon1">상품 할인 가격</span>
                                        <input name="harumarket_product_salePrice" type="int" class="form-control"
                                            placeholder="" aria-label="Username" aria-describedby="basic-addon1"
                                            style="height:31px;">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check mt-3">
                                        <input class="form-check-input" type="checkbox" value="1"
                                            name="harumarket_product_colorViewU" @change="list_view">
                                        <label class="form-check-label" for="harumarket_product_colorView">
                                            상품 색상
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <ul class="list-group list-group-horizontal" ref="harumarket_productColor_uf"
                                        style="visibility: hidden;">
                                        <li class="list-group-item"
                                            v-for="(data, index) in harumarket_product_colorDatas">
                                            <div class="form-check mb-0">
                                                <input class="form-check-input" type="checkbox"
                                                    :value="data.harumarket_productColor_index">
                                                <label class="form-check-label mb-0">
                                                    {{ data.harumarket_productColor_name }}
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check mt-3">
                                        <input class="form-check-input" type="checkbox" value=""
                                            name="harumarket_product_sizeViewU" @change="list_view">
                                        <label class="form-check-label" for="harumarket_product_sizeView">
                                            상품 크기
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <ul class="list-group list-group-horizontal" ref="harumarket_productSize_uf"
                                        style="visibility: hidden;">
                                        <li class="list-group-item"
                                            v-for="(data, index) in harumarket_product_sizeDatas">
                                            <div class="form-check mb-0">
                                                <input class="form-check-input" type="checkbox"
                                                    :value="data.harumarket_productSize_index">
                                                <label class="form-check-label mb-0">
                                                    {{ data.harumarket_productSize_name }}
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <label class="form-label mt-3">상품 사진</label>
                                    <div ref="harumarket_product_picture_uf"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <label class="form-label mt-3">상품 상세</label>
                                    <div ref="harumarket_product_content_uf"></div>
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