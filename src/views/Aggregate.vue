<template>
  <div>
    <Aggregate />
    <AdminSideMenu />
  </div>
</template>

<script>
import Aggregate from "../components/Aggregate.vue";
import AdminSideMenu from "../views/AdminSideMenu";

export default {
  components: {
    Aggregate,
    AdminSideMenu
  }
};
</script>