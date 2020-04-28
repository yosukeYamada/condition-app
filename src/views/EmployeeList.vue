<template>
  <div>
    <EmployeeList />
    <AdminSideNav />
  </div>
</template>

<script>
import EmployeeList from "../components/EmployeeList.vue";
import AdminSideNav from "../components/AdminSideNav";

export default {
  components: {
    EmployeeList,
    AdminSideNav
  }
};
</script>