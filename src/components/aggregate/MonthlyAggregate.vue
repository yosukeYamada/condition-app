<template>
  <b-row>
    <b-col sm="4">
      <b-card>
        <b-card-text>モチベーションスコア</b-card-text>
        <MotivLineChart
          :motiv-chart-data="motivChartData"
          :options="options"
          :isGetData="isGetData"
        ></MotivLineChart>
      </b-card>
    </b-col>
    <b-col sm="4">
      <b-card>
        <b-card-text>コンディションスコア</b-card-text>
        <ConLineChart
          :con-chart-data="conChartData"
          :options="options"
          :isGetData="isGetData"
        ></ConLineChart>
      </b-card>
    </b-col>
    <b-col sm="4">
      <b-card>
        <b-card-text>パフォーマンススコア</b-card-text>
        <PerfoLineChart
          :perfo-chart-data="perfoChartData"
          :options="options"
          :isGetData="isGetData"
        ></PerfoLineChart>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import ConLineChart from "@/components/aggregate/ConLineChart.vue";
import MotivLineChart from "@/components/aggregate/MotivLineChart.vue";
import PerfoLineChart from "@/components/aggregate/PerfoLineChart.vue";
import axios from "axios";
export default {
  components: {
    ConLineChart,
    MotivLineChart,
    PerfoLineChart,
  },
  data() {
    return {
      conditionScoreArray: [],
      isGetData: false,
          motivChartData: {
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
              {
                label: "モチベーション",
                data: [28, 20, 30, 40, 50],
                borderColor: "rgb(240,100,100)",
                backgroundColor: "rgba(240,100,100,0.2)",
                radius: 0,
                hitRadius: 4, // マウスポインタ検出のための円の半径
                borderWidth: 2, // 線の太さ
              },
            ],
          },
      conChartData: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "コンディション",
            data: [28, 20, 30, 40, 50],
            borderColor: "rgb(92,184,92)",
            backgroundColor: "rgba(92,184,92,0.2)",
            radius: 0,
            hitRadius: 4, // マウスポインタ検出のための円の半径
            borderWidth: 2, // 線の太さ
          },
        ],
      },
      perfoChartData: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "パフォーマンス",
            data: [28, 20, 30, 40, 50],
            borderColor: "rgb(245,124,0)",
            backgroundColor: "rgba(245,124,0,0.2)",
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
      var dateArray = Object.keys(responseData).map((elm) => elm.substr(5, 9));
      this.conChartData.labels = dateArray;
      this.conChartData.datasets[0].data = Object.values(responseData).map(
        (elm) => elm.condition.score
      );
      this.motivChartData.labels = dateArray;
      this.motivChartData.datasets[0].data = Object.values(responseData).map(
        (elm) => elm.motivation.score
      );
      this.perfoChartData.labels = dateArray;
      this.perfoChartData.datasets[0].data = Object.values(responseData).map(
        (elm) => elm.performance.score
      );
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
