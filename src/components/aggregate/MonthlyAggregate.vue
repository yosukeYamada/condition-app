<template>
  <b-row>
    <b-card>
      <b-card-title>コンディションスコア</b-card-title>
      <ConBarChart
        class="chart"
        :con-chart-data="conChartData"
        :options="options"
        :isGetData="isGetData"
      ></ConBarChart>
    </b-card>
  </b-row>
</template>

<script>
import ConBarChart from "@/components/aggregate/ConBarChart.vue";
import axios from "axios";
export default {
  components: {
    ConBarChart,
  },
  data() {
    return {
      conditionScoreArray: [],
      isGetData: false,
      conChartData: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "コンディション",
            data: [28, 20, 30, 40, 50],
            borderColor: "#5cb85c",
            radius: 0,
            hitRadius: 4, // マウスポインタ検出のための円の半径
            borderWidth: 2, // 線の太さ
          },
        ],
      },
      options: {
        responsive: true,
        display: true,
        maintainAspectRatio: false,
        scales: { yAxes: [{ ticks: { suggestedMax: 5 } }] },
      },
    };
  },
  methods: {
    convertChartData(responseData) {
      this.conChartData.labels = Object.keys(responseData);
      this.conChartData.datasets[0].data = Object.values(responseData).map(
        (elm) => elm.motivation.score
      );
      // var motivationScoreArray = Object.values(responseData).map(
      //   (elm) => elm.motivation.score
      // );
      // var performanceScoreArray = Object.values(responseData).map(
      //   (elm) => elm.motivation.score
      // );
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/getAggregateByMonth?date=2020/04/27")
      .then((response) => {
        this.convertChartData(response.data);
        this.isGetData = true;
      })
      .catch((e) => {
        alert(e);
      });
  },
};
</script>
