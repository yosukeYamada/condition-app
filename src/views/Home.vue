<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <b-col>
        <AdminHome v-if="authority === 1"></AdminHome>
        <EmployeeHome v-if="authority === 2"></EmployeeHome>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AdminHome from "@/components/home/AdminHome";
import EmployeeHome from "@/components/home/EmployeeHome";
export default {
  components: {
    AdminHome,
    EmployeeHome,
  },

  computed: {
    authority: function() {
      return this.$store.state.loginUser.authority;
    },
  },
};
</script>
