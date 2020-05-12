<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <b-col lg="6">
        <Login></Login>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Login from "@/components/login/Login.vue";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setLoginUser"]),
  },
  components: {
    Login,
  },
};
</script>
