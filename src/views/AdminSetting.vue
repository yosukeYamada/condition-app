<template>
  <div>
    <AdminSetting />
    <AdminSideMenu />
  </div>
</template>

<script>
import AdminSetting from "../components/AdminSetting";
import AdminSideMenu from "../views/AdminSideMenu";

export default {
  components: {
    AdminSetting,
    AdminSideMenu
  }
};
</script>