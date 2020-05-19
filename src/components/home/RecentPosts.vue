<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="本日の未投稿者リスト"
    header-bg-variant="success"
    header-text-variant="white"
    no-body
  >
    <b-list-group flush id="resent-posts-list">
      <b-list-group-item v-for="(latestPost, i) in latestPosts" :key="i">
        <div>
          <span>{{ latestPost.name + "さん" }}</span>
          <span> {{ latestPost.post + "です" }}</span>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-card-text v-if="latestPosts.length === 0">
      <p class="grey--text">本日の未投稿者はいません</p>
    </b-card-text>
  </b-card>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      items: [],
      latestPosts: [],
    };
  },
  methods: {
    setLatestPosts(param) {
      var latestPosts = [];
      var resultPosts = [];
      var preToday = new Date();

      for (let i = 0; i < param.length; i++) {
        var latestPost = {
          date: "",
          name: "",
          post: "",
        };
        //投稿が０の場合
        if (param[i].dailyPost.length === 0) {
          latestPost.date = "2020-05-13T00:43:14.943+0000"; //今日以前の日付
          latestPost.name = param[i].userName;
          latestPost.post = "未投稿";
          latestPosts.push(latestPost);
          //投稿がある場合
        } else {
          latestPost.date = param[i].dailyPost[0].date;
          latestPost.name = param[i].userName;
          latestPost.post = "";
          latestPosts.push(latestPost);
        }
      }
      for (let i = 0; i < latestPosts.length; i++) {
        // var dateStr = param[i].dailyPost[0].date
        var str = latestPosts[i].date;
        var result = str.split("T");
        var result2 = result[0].split("-");
        var rdate = new Date(result2[0], result2[1] - 1, result2[2], 0, 0);
        latestPosts[i].date = rdate;
      }

      for (let i = 0; i < latestPosts.length; i++) {
        if (moment(preToday).isAfter(latestPosts[i].date, "day")) {
          var resultPost = {
            date: "",
            name: "",
            post: "",
          };
          resultPost.date = latestPosts[i].date;
          resultPost.name = latestPosts[i].name;
          resultPost.post = "未投稿";
          resultPosts.push(resultPost);
        }
      }
      return resultPosts;
    },
  },
  created() {
    this.items = this.$store.state.employeeList;
    this.latestPosts = this.setLatestPosts(this.items);
  },
};
</script>

<style scoped>
#resent-posts-list {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
