<template>
  <b-col sm="6">
    <b-card
      border-variant="success"
      style="border-width:2px;"
      header="従業員のユーザー設定"
      header-bg-variant="success"
      header-text-variant="white"
    >
      <b-card-text>
        <div class="mb-2" v-for="(item, i) in items" :key="i">
          <span
            :to="item.path"
            @click="toPage()"
            @mouseover="onMouseover(item)"
            @mouseleave="onMouseleave(item)"
            :style="item.style"
            >{{ item.name }}</span
          >
        </div>
      </b-card-text>
    </b-card>
  </b-col>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          name: "管理者権限の付与・削除",
          path: "",
          style: { color: "#6495ed", textDecoration: "none" },
        },
        {
          name: "ユーザーの登録削除を行う",
          path: "",
          style: { color: "#6495ed", textDecoration: "none" },
        },
      ],
    };
  },
  methods: {
    /** モック用 */
    toPage() {
      alert("このページはまだ開発されてません！");
    },
    /** モック用 */
    onMouseover(item) {
      item.style = { color: "#6495ed", textDecoration: "underline" };
    },
    /** モック用 */
    onMouseleave(item) {
      item.style = { color: "#6495ed", textDecoration: "none" };
    },
  },
};
</script>
