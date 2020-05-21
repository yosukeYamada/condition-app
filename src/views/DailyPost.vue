<template>
  <b-container class="mt-5">
    <b-row align-v="center" align-h="center">
      <DailyPostForm />
    </b-row>
  </b-container>
</template>

<script>
import DailyPostForm from "@/components/daily-post/DailyPostForm.vue";

export default {
  components: {
    DailyPostForm,
  },
};
</script>
