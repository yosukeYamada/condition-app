<template>
  <div id="posts">
    <div id="content">
      <Posts />
    </div>
    <Menubotton id="Menubotton"></Menubotton>
    <AdminSideNav></AdminSideNav>

    
  </div>
</template>

<script>
import Posts from "../components/Posts";
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

<style>
#content {
  text-align: center;
}
</style>
