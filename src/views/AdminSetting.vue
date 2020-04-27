<template>
  <div>
    <AdminSetting />
    <AdminSideNav></AdminSideNav>
  </div>
</template>

<script>
import AdminSetting from "../components/AdminSetting";
import AdminSideNav from "../components/AdminSideNav";

export default {
  components: {
    AdminSetting,
    AdminSideNav
  }
};
</script>