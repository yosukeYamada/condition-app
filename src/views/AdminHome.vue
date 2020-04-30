<template>
  <div id="home">
    <div id="content">
      <AdminHome />
    </div>


    <Menubotton id="Menubotton"></Menubotton>

    <AdminSideNav></AdminSideNav>

    
  </div>
</template>

<script>
import AdminHome from "../components/AdminHome";
import AdminSideNav from "../components/AdminSideNav";
import Menubotton from "../components/Menubotton";

export default {
  components: {
    AdminHome,
    AdminSideNav,
    Menubotton,
  },

};
</script>

<style>
#content {
  text-align: center;
}
</style>
