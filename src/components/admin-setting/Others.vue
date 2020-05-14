<template>
  <b-col sm="6">
    <b-card
      border-variant="success"
      style="border-width:2px;"
      header="その他の設定"
      header-bg-variant="success"
      header-text-variant="white"
    >
      <b-card-text>
        <div class="mb-2">
          <span
            v-b-modal.edit-deps-modal
            class="blue--text text--darken-3"
            :style="{ textDecoration: 'none' }"
            >部署名の変更、追加及び削除</span
          >
          <EditDepsModal />
        </div>
        <div class="mb-2">
          <span
            class="blue--text text--darken-3"
            :style="{ textDecoration: 'none' }"
            @click="toPage('/editDeps')"
            >部署名の変更、追加及び削除(別ページ)</span
          >
        </div>
      </b-card-text>
    </b-card>
  </b-col>
</template>
<script>
import EditDepsModal from "@/components/admin-setting/EditDepsModal.vue";
export default {
  components: {
    EditDepsModal,
  },
  methods: {
    toPage(path) {
      this.$router.push(path);
    },
  },
};
</script>
