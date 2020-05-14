<template>
  <b-container>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :disabled="item.disabled">
          <router-link :class="item.class" :to="item.path">
            {{ item.text }}
          </router-link>
        </v-breadcrumbs-item>
      </template>
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <b-row align-v="center" align-h="center">
      <b-col lg="6" md="8">
        <EditDeps />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EditDeps from "@/components/admin-setting/EditDeps.vue";

export default {
  components: {
    EditDeps,
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
          path: "/editDeps",
          class: ["grey--text"],
        },
      ],
    };
  },
};
</script>
