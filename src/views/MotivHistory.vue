<template>
  <div>
    <Motivations />
    <AdminSideMenu />
  </div>
</template>

<script>
import Motivations from "../components/Motivations.vue";
import AdminSideMenu from "../views/AdminSideMenu";

export default {
  components: {
    Motivations,
    AdminSideMenu
  }
};
</script>