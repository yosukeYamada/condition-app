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
          :input-chart-data="inputChartData"
          :options="options"
          :is-get-data="isGetData"
        ></InputPieChart>
      </div>
      <div class="text-center font-weight-bold">
        {{ totalNumbers }}人中{{ totalNumbers - unPosted }}人が入力完了
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
      unPosted: 0,
      inputChartData: {
        datasets: [
          {
            backgroundColor: ["#00BCD4", "#E0F7FA"],
            data: [1, 1],
          },
        ],
      },
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
            data: [this.posted, this.unPosted],
          },
        ],
      };
      this.isGetData = this.isGetData ? false : true;
    },
    // 未投稿者のリスト
    setUnPosted() {
      var employeeList = this.$store.state.employeeList;
      var today = new Date();
      for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].dailyPost.length === 0) {
          /** 投稿数が0の場合 */
          this.unPosted++;
        } else {
          /** 投稿がある場合 */
          if (
            moment(employeeList[i].dailyPost[0].date).isBefore(today, "day")
          ) {
            /** 最新の投稿日が今日より前の場合 */
            this.unPosted++;
          }
        }
      }
    },
  },
  watch: {
    totalNumbers: async function() {
      await this.setUnPosted();
      await this.fillData();
      this.isGetData = this.isGetData ? false : true;
    },
  },
  computed: {
    totalNumbers() {
      return this.$store.state.employeeList.length;
    },
    // 投稿人数
    posted() {
      return this.totalNumbers - this.unPosted;
    },
  },
  async mounted() {
    await this.setUnPosted();
    this.fillData();
  },
};
</script>

<style scoped>
.rate {
  max-height: 200px;
  max-width: 200px;
}
</style>
