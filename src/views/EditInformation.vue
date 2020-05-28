<template>
  <b-container class="mt-5">
    <BreadCrumbs :items="items" />
    <b-row align-v="center" align-h="center">
      <b-col lg="9" md="10" sm="12">
        <EditInfo />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
import EditInfo from "@/components/admin-setting/EditInfo.vue";
import moment from "moment";
export default {
  components: {
    EditInfo,
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
          text: "トップの更新情報の編集・削除",
          disabled: false,
          path: "/editInformationList",
          class: [],
        },
        {
          text: "編集・削除を行う",
          disabled: true,
          path: "",
          class: ["grey--text"],
        },
      ],
    };
  },
  computed: {
    info() {
      return JSON.parse(decodeURIComponent(this.$route.query.info));
    },
  },
  mounted() {
    this.items[2].text =
      moment(this.info.informationDate).format("YYYY/MM/DD") +
      "の投稿の編集・削除を行う";
  },
};
</script>
