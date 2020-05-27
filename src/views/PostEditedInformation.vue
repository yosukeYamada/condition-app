<template>
  <b-container class="mt-5">
    <EditInfo/>
  </b-container>
</template>

<script>
import EditInfo from "@/components/top/EditInfo.vue";
export default {
  components: {
    EditInfo
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