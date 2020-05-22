<template>
  <b-container class="mt-5">
    <b-row align-v="center" align-h="center">
      <b-col sm="12" md="10" lg="8" xl="8">
        <RegisterUser />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RegisterUser from "@/components/register-user/RegisterUser";

export default {
  components: {
    RegisterUser,
  },
};
</script>
