<template>
  <div>
    <Aggregate />
    <AdminSideNav />
  </div>
</template>

<script>
import Aggregate from "../components/Aggregate.vue";
import AdminSideNav from "../components/AdminSideNav";

export default {
  components: {
    Aggregate,
    AdminSideNav
  }
};
</script>