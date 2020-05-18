<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="お知らせ"
    header-bg-variant="success"
    header-text-variant="white"
  >
    <b-card-text id="HomeNewsList">
      <div class="mb-5" v-for="(newsPost,i ) in newsPostList" :key="i">
        <p class="mb-2 font-weight-bold">{{ newsPost.newsDate | moment }}</p>
        <p>{{ newsPost.newsComment }}</p>
      </div>
    </b-card-text>
    <b-card-text v-if="newsPostList.length === 0">
      <p>現在お知らせはありません</p>
    </b-card-text>
  </b-card>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      newsPostList: [],
    };
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD HH:mm");
    },
  },
  created() {
    this.newsPostList = this.$store.state.newsPost;
  },
};
</script>

<style>
#HomeNewsList {
  height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
