<template>
  <b-col sm="6">
    <b-card
      border-variant="success"
      style="border-width:2px;"
      header="投稿関連"
      header-bg-variant="success"
      header-text-variant="white"
    >
      <b-card-text>
        <div class="mb-2">
          <span
            v-b-modal.news-post
            class="blue--text text--darken-3"
            :style="{ textDecoration: 'none' }"
            >お知らせの投稿・削除</span
          >
          <NewsPost />
        </div>
        <div class="mb-2">
          <router-link
            to="/postInformation"
            :style="{ textDecoration: 'none' }"
          >
            <span class="blue--text text--darken-3"
              >トップの更新情報の投稿・編集・削除</span
            >
          </router-link>
        </div>
      </b-card-text>
    </b-card>
  </b-col>
</template>

<script>
import NewsPost from "@/components/admin-setting/NewsPost";
export default {
  components: {
    NewsPost,
  },
};
</script>
