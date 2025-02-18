<script>
import navComponent from '@/components/nav.vue'
export default {
    components: {
        navComponent
    },
    data: function () {
        return {
            search: null,
            result: null,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.search = this.$refs.search;
            this.result = this.$refs.result;
            this.search.style.height = (screen.height / 5 + 0) + "px";
            this.result.style.height = (screen.height / 1.6 + 0) + "px";
        })
    },
}
</script>
<template>
    <div class="container-fluid h-100 w-100 p-0 m-0">
        <navComponent category="" category_detail=""/>
        <div class="row">
            <div class="col-12 pb-0" ref="search">
                404
            </div>
            <div class="col-12 mt-2" ref="result">
                페이지를 찾지 못했습니다.
            </div>
        </div>
    </div>
</template>