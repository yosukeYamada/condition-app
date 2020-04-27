<template>
    <div class="b-sidebar">
    <Header></Header>
     <AdminSideNav></AdminSideNav>
    </div>

</template>

<script>
import Header from "../components/Header.vue"
import AdminSideNav from "../components/AdminSideNav.vue"
export default {

    components:{
        AdminSideNav,
        Header,
    }

}


</script>

<style>
.sideMenu{
    width:30%;
    background : #66CC66;
}





</style>