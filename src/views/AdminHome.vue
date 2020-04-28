<template>

  <div id="home">
    <div id="content">
      <AdminHome />
    </div>
    <AdminSideMenu></AdminSideMenu>
  </div>
</template>

<script>
import AdminHome from "../components/AdminHome";
import AdminSideMenu from "../views/AdminSideMenu";

export default {
  components: {
    AdminHome,
    AdminSideMenu,
  },
};
</script>

<style>
#content {
  text-align: center;
}
</style>
