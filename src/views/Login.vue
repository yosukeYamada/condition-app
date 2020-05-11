<template>
  <b-col sm="6">
    <Login></Login>
  </b-col>
</template>

<script>
import Login from "@/components/login/Login.vue";
import { mapActions } from "vuex";


export default {
  
  methods: {
    ...mapActions(["setLoginUser"])
  },
  components: {
    Login
  },
};
</script>