<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="お知らせ"
    header-bg-variant="success"
    header-text-variant="white"
    no-body
  >
    <b-list-group id="HomeNewsList" flush>
      <b-list-group-item v-for="(newsPost, i) in newsPostList" :key="i">
        <p class="mb-1 font-weight-bold body-2 grey--text">
          {{ newsPost.newsDate | moment }}
        </p>
        <p class="mb-1">{{ newsPost.newsComment }}</p>
      </b-list-group-item>
    </b-list-group>
    <b-card-text class="p-3" v-if="newsPostList.length === 0">
      <p class="grey--text">現在お知らせはありません</p>
    </b-card-text>
  </b-card>
</template>

<script>
import moment from "moment";
import axios from "axios";
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
    axios.get("/showNewsList").then((response) => {
      this.$store.dispatch("setNewsPostList", response.data);
      this.newsPostList = this.$store.state.newsPostList;
    });
  },
};
</script>

<style scoped>
#HomeNewsList {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
