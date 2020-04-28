<template>
  <div id="home">
    <div id="content">
      <AdminHome />
    </div>

    <Menubotton id="Menubotton"></Menubotton>

    <AdminSideMenu></AdminSideMenu>
  </div>
</template>

<script>
import AdminHome from "../components/AdminHome";
import AdminSideMenu from "../views/AdminSideMenu";
import Menubotton from "../components/Menubotton";

export default {
  components: {
    AdminHome,
    AdminSideMenu,
    Menubotton,
  },
};
</script>

<style>
#content {
  text-align: center;
}
</style>
