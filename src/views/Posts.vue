<template>
  <div id="posts">
    <Posts />
    <AdminSideNav />
  </div>
</template>

<script>
import Posts from "../components/Posts";
import AdminSideNav from "../components/AdminSideNav";

export default {
  components: {
    Posts,
    AdminSideNav
  }
};
</script>

