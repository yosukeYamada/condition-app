<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="未回答者一覧"
    header-bg-variant="success"
    header-text-variant="white"
    no-body
    class="h-100"
  >
    <b-list-group v-if="latestPosts.length !== 0" flush id="resent-posts-list">
      <b-list-group-item v-for="(latestPost, i) in latestPosts" :key="i">
        <div>
          <span>{{ latestPost.name + "さん" }}</span>
          <span> {{ latestPost.post + "です" }}</span>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-card-text v-if="latestPosts.length === 0">
      <div class="p-3 grey--text">本日の未回答者はいません</div>
    </b-card-text>
  </b-card>
</template>
<script>
// import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      items: [],
      latestPosts: [],
    };
  },
  methods: {
    /** 従業員一覧から未投稿者一覧を作成 */
    setLatestPosts(param) {
      var latestPosts = []; //投稿数0を含めた全従業員の情報
      var resultPosts = []; //未投稿者のリスト
      var preToday = moment(); //今日の日付
      // 投稿数0の従業員に仮で投稿日付を与える
      for (let i = 0; i < param.length; i++) {
        var latestPost = {
          date: "",
          name: "",
          post: "",
        };
        //投稿が０の場合
        if (param[i].dailyPost.length === 0) {
          latestPost.date = "2020-05-13T00:43:14.943+0000"; //今日以前の適当な日付（エラーが出るため）
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
      // 過去の投稿の日付がString型なのでdate型に変換して未投稿者をresultPostsに入れる
      for (let i = 0; i < latestPosts.length; i++) {
        var str = latestPosts[i].date; //文字列の日付
        var splitStrT = str.split("T");
        var splitStr = splitStrT[0].split("-");
        latestPosts[i].date = new Date(splitStr[0], splitStr[1] - 1, splitStr[2], 0, 0);
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
    // axios.get("/showEmployeeList")
    // .then((response) => {
    //   this.$store.dispatch("setEmployeeList", response.data);
    // })
      this.items = this.$store.state.employeeList;
      this.latestPosts = this.setLatestPosts(this.items);
  },
};
</script>

<style scoped>
#resent-posts-list {
  height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
