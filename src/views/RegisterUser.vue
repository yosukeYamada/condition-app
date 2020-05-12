<template>
  <div id="registerUser">
    <b-container>
      <b-row align-v="center" align-h="center">
        <RegisterUser />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RegisterUser from "@/components/register-user/RegisterUser";

export default {
  components: {
    RegisterUser,
  },
};
</script>
