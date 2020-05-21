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

export default {
  components: {
    Login,
  },
};
</script>
