<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <EditDailyPostForm />
    </b-row>
  </b-container>
</template>

<script>
import EditDailyPostForm from "@/components/daily-post/EditDailyPostForm.vue";

export default {
  components: {
    EditDailyPostForm,
  },
};
</script>
