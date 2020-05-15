<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <UpdateUserForm />
    </b-row>
  </b-container>
</template>

<script>
import UpdateUserForm from "@/components/update/UpdateUserForm";

export default {
  components: {
    UpdateUserForm,
  },
};
</script>
