<template>
  <div id="posts">
    <div id="content">
      <Posts />
    </div>

    <AdminSideMenu />
  </div>
</template>

<script>
import Posts from "../components/Posts";
import AdminSideMenu from "../views/AdminSideMenu";

export default {
  components: {
    Posts,
    AdminSideMenu
  }
};
</script>

<style>
#content {
  text-align: center;
}
</style>
