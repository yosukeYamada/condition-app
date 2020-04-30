<template>
  <div>
    <Menubotton id="Menubotton"></Menubotton>
    <AdminSideNav></AdminSideNav>
    <EmployeeList />
    
  </div>
</template>

<script>
import EmployeeList from "../components/EmployeeList.vue";
import Menubotton from "../components/Menubotton";
import AdminSideNav from "../components/AdminSideNav";

export default {
  components: {
    EmployeeList,
    Menubotton,
    AdminSideNav
  }
};
</script>