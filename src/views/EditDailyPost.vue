<template>
  <b-container class="mt-5">
    <BreadCrumbs :items="items" />
    <b-row align-v="center" align-h="center">
      <EditDailyPostForm />
    </b-row>
  </b-container>
</template>

<script>
import EditDailyPostForm from "@/components/daily-post/EditDailyPostForm.vue";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
export default {
  components: {
    EditDailyPostForm,
    BreadCrumbs,
  },
  data() {
    return {
      items: [
        {
          text: "マイコンディション履歴",
          disabled: false,
          path: "/myCondition",
          class: [],
        },
        {
          text: "今日のコンディション編集",
          disabled: true,
          path: "",
          class: ["grey--text"],
        },
      ],
    };
  },
};
</script>
