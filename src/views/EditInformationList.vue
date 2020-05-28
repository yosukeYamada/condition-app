<template>
  <b-container class="mt-5">
    <BreadCrumbs :items="items" />
    <b-row align-v="center" align-h="center">
      <InformationList />
    </b-row>
  </b-container>
</template>

<script>
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
import InformationList from "@/components/admin-setting/InformationList.vue";
export default {
  components: {
    BreadCrumbs,
    InformationList,
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
          text: "トップの更新情報の編集・削除",
          disabled: true,
          path: "/editInformation",
          class: ["grey--text"],
        },
      ],
    };
  },
};
</script>
