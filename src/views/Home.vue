<template>
  <div>
    <EmployeeHome v-if="authority === 1"></EmployeeHome>
    <AdminHome v-if="authority === 2"></AdminHome>
  </div>
</template>

<script>
import AdminHome from "@/components/AdminHome";
import EmployeeHome from "@/components/EmployeeHome";

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
