<template>
  <v-breadcrumbs class="py-0 pl-1" :items="items">
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
</template>
<script>
export default {
  props: ["items"],

  /** propsでもらう配列のサンプル */
  //     items: [
  //     {
  //       text: "管理者設定",
  //       disabled: false,
  //       path: "/adminSetting",
  //       class: [],
  //     },
  //     {
  //       text: "部署名の変更、追加及び削除",
  //       disabled: true,
  //       path: "",
  //       class: ["grey--text"],
  //     },
  //   ],
};
</script>
