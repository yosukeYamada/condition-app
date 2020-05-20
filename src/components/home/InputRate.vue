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
      <InputPieChart 
      :chart-data="inputChartData"
      :options="options"
      :is-get-data="isGetData"
      ></InputPieChart>
    </div>
    <div>投稿者数 : {{ getPosted() }}人/{{ totalNnumbers.length }}人</div>
  </b-card>
</template>

<script>
import InputPieChart from "@/components/home/InputPieChart";
import moment from "moment";

export default {
  components: {
    InputPieChart
  },
  props: ["selectedDate"],
  data() {
    return {
      totalNnumbers: [],
      postedNnumbers: [],
      unpostedNnumbers: [],
      isGetData: false,
      inputChartData: null,
      options: {
        responsive: true,
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
            data: [this.getPosted(), this.getUnPosted()]
          }
        ]
      };
    },
    getPosted() {
      this.totalNnumbers = this.$store.state.employeeList;
      return this.totalNnumbers.length - this.unpostedNnumbers.length;
      // return 1;
    },
    getUnPosted() {
      return this.unpostedNnumbers.length;
      // return 3;
    },
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
        //投稿が0の場合
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
  watch: {
    selectedDate: {
      handler: function() {
        this.fillData();
      }
    }
  },
  created() {
    this.totalNnumbers = this.$store.state.employeeList;
    this.unpostedNnumbers = this.setLatestPosts(this.totalNnumbers);
    this.fillData();
  }
};
</script>

<style>
.small {
  max-height: 200px;
  max-width: 200px;
}
</style>