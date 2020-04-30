<template>
  <div>
    <Menubotton id="Menubotton"></Menubotton>
    <Motivations />
    <AdminSideMenu />
  </div>
</template>

<script>
import Motivations from "../components/Motivations.vue";
import AdminSideMenu from "../views/AdminSideMenu";
import Menubotton from "../components/Menubotton";

export default {
  components: {
    Motivations,
    AdminSideMenu,
    Menubotton,
  }
};
</script>