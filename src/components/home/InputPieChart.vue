<script>
// ここでこのコンポーネントで使用するグラフの種類を定義する。
// 今回はドーナツグラフなのでDoughnutとなる。
import { Doughnut } from 'vue-chartjs'
import moment from "moment";

export default ({
  extends: Doughnut,
  data() {
    return {
      items: [],
      latestPosts: [],
      datas: {
        // 表示するデータ
        datasets: [
          {
            data: [90, 10],
            backgroundColor: ['#89c3eb']
          }
        ]
      },
      options: {
        responsive: true
      }
    }
  },
  mounted() {
    this.renderChart(this.datas, this.options)
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
          post: ""
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
            post: ""
          };
          resultPost.date = latestPosts[i].date;
          resultPost.name = latestPosts[i].name;
          resultPost.post = "未投稿";
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
})
</script>