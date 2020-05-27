<template>
  <b-container class="mt-5">
    <BreadCrumbs :items="items" v-if="!this.$store.state.loginStatus" />
    <BreadCrumbs :items="admin" v-if="this.$store.state.loginStatus" />
    <b-row align-v="center" align-h="center">
      <b-col lg="10">
        <Information></Information>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Information from "@/components/top/Information.vue";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
export default {
  components: {
    Information,
    BreadCrumbs,
  },
  data() {
    return {
      items: [
        {
          text: "トップ",
          disabled: false,
          path: "/",
          class: [],
        },
        {
          text: "更新情報詳細",
          disabled: true,
          path: "",
          class: ["grey--text"],
        },
      ],
      admin: [
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
