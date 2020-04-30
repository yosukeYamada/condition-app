<template>
  <div>
    <Menubotton id="Menubotton"></Menubotton>
    <AdminSetting />
    <AdminSideNav />
  </div>
</template>

<script>
import AdminSetting from "../components/AdminSetting";
import AdminSideNav from "../components/AdminSideNav";
import Menubotton from "../components/Menubotton";

export default {
  components: {
    AdminSetting,
    AdminSideNav,
    Menubotton
  }
};
</script>