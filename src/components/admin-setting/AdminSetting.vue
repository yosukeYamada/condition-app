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
        <div class="mb-2">
          <span
            v-b-modal.authority-modal
            class="blue--text text--darken-3"
            :style="{ textDecoration: 'none' }"
            >管理者権限の付与・削除</span
          >
          <AuthorityModal />
        </div>
        <div class="mb-2">
          <span
            @click="toPage"
            class="blue--text text--darken-3"
            :style="{ textDecoration: 'none' }"
            >ユーザーの登録削除を行う</span
          >
        </div>
      </b-card-text>
    </b-card>
  </b-col>
</template>
<script>
import AuthorityModal from "@/components/admin-setting/AuthorityModal.vue";

export default {
  components: {
    AuthorityModal,
  },
  methods: {
    /** モック用 */
    toPage() {
      alert("このページはまだ開発されてません！");
    },
  },
};
</script>
