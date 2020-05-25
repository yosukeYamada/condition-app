<template>
  <b-container fluid class="mt-5">
    <b-row align-h="center">
      <b-col>
        <b-row align-v="center" align-h="center">
          <b-col sm="12" md="12" lg="10">
            <HomeNews />
          </b-col>
        </b-row>
        <b-row align-h="center" v-if="authority === ADMIN">
          <b-col sm="6" md="5" lg="4">
            <InputRate />
          </b-col>
          <b-col sm="6" md="7" lg="6">
            <UnansweredList />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HomeNews from "@/components/home/HomeNews";
import UnansweredList from "@/components/home/UnansweredList";
import InputRate from "@/components/home/InputRate";
import AUTHORITY from "@/assets/js/Authority.js";
import store from "../store";

export default {
  components: {
    HomeNews,
    UnansweredList,
    InputRate,
  },
  data() {
    return {
      ADMIN: AUTHORITY.ADMIN,
    };
  },
  computed: {
    authority: function() {
      return this.$store.state.loginUser.authority;
    },
  },
  async beforeRouteEnter(to, from, next) {
    if (
      store.state.loginUser.authority === AUTHORITY.ADMIN &&
      store.state.employeeList.length === 0
    )
      await store.dispatch("getEmployeeList");
    next();
  },
};
</script>
