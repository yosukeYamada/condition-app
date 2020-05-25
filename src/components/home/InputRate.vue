<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="本日の入力率"
    header-bg-variant="success"
    header-text-variant="white"
    no-body
    class="h-100"
  >
    <b-card-text class="p-4">
      <div class="mx-auto rate mb-3">
        <InputPieChart
          :chartData="inputChartData"
          :options="options"
          :isGetData="isGetData"
        ></InputPieChart>
      </div>
      <div class="text-center font-weight-bold">
        {{ totalNumbers }}人中{{ posted }}人が入力完了
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import InputPieChart from "@/components/home/InputPieChart";
import moment from "moment";

export default {
  components: {
    InputPieChart,
  },
  data() {
    return {
      inputChartData: {},
      isGetData: false,
      options: {
        responsive: true,
        cutoutPercentage: 70,
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
    };
  },
  methods: {
    fillData() {
      this.inputChartData = {
        datasets: [
          {
            backgroundColor: ["#00BCD4", "#E0F7FA"],
            data: [this.posted(), this.unPosted()],
            inputRate: ((this.posted / this.totalNumbers) * 100).toFixed(1),
          },
        ],
      };
      alert("fillData!!");
    },
    // 未投稿者のリスト
    async setLatestPosts(employeeList) {
      var latestPosts = [];
      var resultPosts = [];
      var preToday = new Date();

      for (let i = 0; i < employeeList.length; i++) {
        var latestPost = {
          date: "",
        };
        //投稿が0の場合
        if (employeeList[i].dailyPost.length === 0) {
          latestPost.date = "2020-05-13T00:43:14.943+0000"; //今日以前の日付
          latestPosts.push(latestPost);
          //投稿がある場合
        } else {
          latestPost.date = employeeList[i].dailyPost[0].date;
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
      alert("setLatestPost!!");
      return resultPosts;
    },
  },
  computed: {
    totalNumbers: () => {
      return this.$store.state.employeeList.length;
    },
    unPosted() {
      return this.unpostedNnumbers.length;
    },
    // 投稿人数
    posted() {
      return this.totalNumbers - this.unPosted;
    },
  },
  mounted() {
    let drawChart = () => {
      this.setLatestPosts(
        this.$store.state.employeeList
      ).then(this.fillData());
    };
    drawChart();
  },
};
</script>

<style scoped>
.rate {
  max-height: 200px;
  max-width: 200px;
}
</style>
