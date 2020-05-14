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
          <router-link to="/editDeps" :style="{ textDecoration: 'none' }">
            <span
              class="blue--text text--darken-3"
              >部署名の変更、追加及び削除</span
            >
          </router-link>
        </div>
      </b-card-text>
    </b-card>
  </b-col>
</template>
<script>
export default {};
</script>
