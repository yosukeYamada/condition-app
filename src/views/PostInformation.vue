<template>
  <b-container class="mt-5">
    <BreadCrumbs :items="items" />
    <b-row align-v="center" align-h="center">
      <b-col lg="9" md="10" sm="12">
        <PostInfo />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PostInfo from "@/components/admin-setting/PostInfo.vue";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
export default {
  components: {
    PostInfo,
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
          disabled: true,
          path: "/postInformation",
          class: ["grey--text"],
        },
      ],
    };
  },
};
</script>
