<template>
  <b-col>
    <AdminHome v-if="authority === 1"></AdminHome>
    <EmployeeHome v-if="authority === 2"></EmployeeHome>
  </b-col>
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
    authority() {
      return this.$store.state.login_user.user.authority;
    },
  },
};
</script>
