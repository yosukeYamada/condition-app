<template>
  <div id="posts">
      <Posts />
    <Menubotton id="Menubotton"></Menubotton>
    <AdminSideNav></AdminSideNav>

    
  </div>
</template>

<script>
import Posts from "@/components/daily-post/Posts.vue";
import AdminSideNav from "../components/AdminSideNav"
import Menubotton from "../components/Menubotton";

export default {
  components: {
    Posts,
    AdminSideNav,
    Menubotton
  }
};
</script>

