<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <b-col lg="8">
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
