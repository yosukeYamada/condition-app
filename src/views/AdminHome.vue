<template>
  <div id="home">
    <AdminHome />
    <AdminSideNav></AdminSideNav>
  </div>
</template>

<script>
import AdminHome from "../components/AdminHome";
import AdminSideNav from "../components/AdminSideNav";

export default {
  components: {
    AdminHome,
    AdminSideNav
  }
};
</script>
