<template>
  <b-container class="mt-5">
    <BreadCrumbs :items="items" />
    <b-row align-v="center" align-h="center">
      <b-col lg="6" md="8">
        <EditDeps />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EditDeps from "@/components/admin-setting/EditDeps.vue";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
export default {
  components: {
    EditDeps,
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
          text: "部署名の変更、追加及び削除",
          disabled: true,
          path: "",
          class: ["grey--text"],
        },
      ],
    };
  },
};
</script>
