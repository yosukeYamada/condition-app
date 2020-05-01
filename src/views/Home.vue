<template>
  <div>

    <AdminHome v-show="authority=1"></AdminHome>
    <EmployeeHome v-show="authority=2"></EmployeeHome><br>
     {{authority}}
  </div>
</template>

<script>
import AdminHome from "../components/AdminHome";
import EmployeeHome from "../components/EmployeeHome";

export default {
  components: {
    AdminHome,
    EmployeeHome
  },

  computed:{
      authority:function(){
          return this.$store.state.authority
      }
  }
};
</script>
