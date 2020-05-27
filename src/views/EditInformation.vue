<template>
  <b-container class="mt-5">
    <BreadCrumbs :items="items" />
    編集用
  </b-container>
</template>

<script>
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
export default {
  components: {
    BreadCrumbs,
  },
  data() {
    return {
      items: [
        {
          text: "管理者設定",
          disabled: false,
          path: "/adminSetting",
          class: [],
        },
        {
          text: "トップページのNews投稿",
          disabled: false,
          path: "/postInformation",
          class: [],
        },
        {
          text: "トップページのNews編集・削除",
          disabled: true,
          path: "/editInformation",
          class: ["grey--text"],
        },
      ],
    };
  },
};
</script>