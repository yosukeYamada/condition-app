<template>
  <b-container class="mt-5">
    <BreadCrumbs :items="items" />
    <b-row align-v="center" align-h="center">
      <b-col sm="12" md="10" lg="8" xl="8">
        <UpdateUserForm />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import UpdateUserForm from "@/components/update/UpdateUserForm";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";

export default {
  components: {
    UpdateUserForm,
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
          text: "ユーザー情報の更新・削除",
          disabled: false,
          path: "/updateUser",
          class: [""],
        },
        {
          text: "ユーザー情報の更新",
          disabled: true,
          path: "",
          class: ["grey--text"],
        },
      ],
    };
  },
  mounted() {
    this.items[2].text = this.$route.params.name + "さんのユーザー情報の更新";
  },
};
</script>
