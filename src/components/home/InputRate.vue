<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="本日の入力率"
    header-bg-variant="success"
    header-text-variant="white"
  >
    <InputPieChart></InputPieChart>

    <!-- <b-card-text>
          <div>{{ "未投稿：" + latestPosts.length + "人/" + items.length + "人"}}</div>
          <div>{{ items.length - latestPosts.length }}</div>
    </b-card-text> -->

  </b-card>
</template>

<script>
import InputPieChart from "@/components/home/InputPieChart";
import moment from "moment";

export default {
  watch: {},
  components: {
    InputPieChart
  },
  data() {
    return {
      items: [],
      latestPosts: []
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
        };
        //投稿が０の場合
        if (param[i].dailyPost.length === 0) {
          latestPost.date = "2020-05-13T00:43:14.943+0000"; //今日以前の日付
          latestPosts.push(latestPost);
          //投稿がある場合
        } else {
          latestPost.date = param[i].dailyPost[0].date;
          latestPosts.push(latestPost);
        }
      }
      for (let i = 0; i < latestPosts.length; i++) {
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
          };
          resultPost.date = latestPosts[i].date;
          resultPosts.push(resultPost);
        }
      }
      return resultPosts;
    }
  },
  created() {
    this.items = this.$store.state.employeeList
    this.latestPosts = this.setLatestPosts(this.items)
  }
};
</script>
