<template>
  <div>
    <EmployeeHome />
    <EmployeeSideNav />
  </div>
</template>

<script>
import EmployeeHome from "../components/EmployeeHome";
import EmployeeSideNav from "../components/EmployeeSideNav";

export default {
  components: {
    EmployeeHome,
    EmployeeSideNav
  }
};
</script>
