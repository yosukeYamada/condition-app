<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="本日の入力率"
    header-bg-variant="success"
    header-text-variant="white"
    no-body
  >
    <div class="small">
      <InputPieChart :chartData="inputChartData" :options="options" :isGetData="isGetData"></InputPieChart>
    </div>
    <div>全社員 : {{ totalNnumbers.length }}人</div>
    <div>投稿した : {{ getPosted() }}人</div>
    <div>投稿してない : {{ getUnPosted() }}人</div>
  </b-card>
</template>

<script>
import InputPieChart from "@/components/home/InputPieChart";
import axios from "axios";
import moment from "moment";

export default {
  components: {
    InputPieChart
  },
  data() {
    return {
      totalNnumbers: [],
      postedNnumbers: [],
      unpostedNnumbers: [],
      isGetData: false,
      options: {
        responsive: true,
        cutoutPercentage: 70,
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        }
      }
    };
  },
  methods: {
    fillData() {
      this.inputChartData = {
        datasets: [
          {
            backgroundColor: ["#00BCD4", "#E0F7FA"],
            data: [this.getPosted(), this.getUnPosted()],
            inputRate:
              (this.getPosted() / this.totalNnumbers.length) * 100 + "%"
          }
        ]
      };
    },
    // 投稿人数
    getPosted() {
      this.totalNnumbers = this.$store.state.employeeList;
      this.postedNnumbers =
        this.totalNnumbers.length - this.unpostedNnumbers.length;
      return this.postedNnumbers;
    },
    // 未投稿人数
    getUnPosted() {
      return this.unpostedNnumbers.length;
    },
    // 未投稿者のリスト
    setLatestPosts(param) {
      var latestPosts = [];
      var resultPosts = [];
      var preToday = new Date();

      for (let i = 0; i < param.length; i++) {
        var latestPost = {
          date: ""
        };
        //投稿が0の場合
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
            date: ""
          };
          resultPost.date = latestPosts[i].date;
          resultPosts.push(resultPost);
        }
      }
      return resultPosts;
    }
  },
  created() {
    axios.get("/showEmployeeList").then(response => {
      this.$store.dispatch("setEmployeeList", response.data);
      this.totalNnumbers = this.$store.state.employeeList;
      this.unpostedNnumbers = this.setLatestPosts(this.totalNnumbers);
      this.fillData();
    });
      this.fillData();
  }
};
</script>

<style>
.small {
  max-height: 200px;
  max-width: 200px;
  margin: 0px, 50px;
}
</style>