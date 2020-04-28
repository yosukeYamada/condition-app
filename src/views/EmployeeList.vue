<template>
  <div>
    <EmployeeList />
    <AdminSideMenu />
  </div>
</template>

<script>
import EmployeeList from "../components/EmployeeList.vue";
import AdminSideMenu from "../views/AdminSideMenu";

export default {
  components: {
    EmployeeList,
    AdminSideMenu
  }
};
</script>