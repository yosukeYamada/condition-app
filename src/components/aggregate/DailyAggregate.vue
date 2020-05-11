<template>
  <div id="content">
    <b-row>
      <b-col sm="4">
        <b-card>
          <MotivPieChart
            :motiv-chart-data="motivChartData"
            :options="options"
            :is-get-data="isGetData"
          ></MotivPieChart>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card>
          <ConPieChart
            :con-chart-data="conChartData"
            :options="options"
            :isGetData="isGetData"
          ></ConPieChart>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card>
          <PerfoPieChart
            :perfo-chart-data="perfoChartData"
            :options="options"
            :is-get-data="isGetData"
          ></PerfoPieChart>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from "axios";
import ConPieChart from "@/components/aggregate/ConPieChart";
import MotivPieChart from "@/components/aggregate/MotivPieChart";
import PerfoPieChart from "@/components/aggregate/PerfoPieChart";

export default {
  components: {
    ConPieChart,
    MotivPieChart,
    PerfoPieChart,
  },
  props: ["selectedDate"],
  data() {
    return {
      isGetData: false,
      conChartData: {
        labels: ["快晴", "晴れ", "曇り", "雨", "嵐"],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#ea5550",
              "#f3981d",
              "#b2cbe4",
              "#68a4d9",
              "#0075c2",
            ],
          },
        ],
      },
      motivChartData: {
        labels: ["快晴", "晴れ", "曇り", "雨", "嵐"],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#ea5550",
              "#f3981d",
              "#b2cbe4",
              "#68a4d9",
              "#0075c2",
            ],
          },
        ],
      },
      perfoChartData: {
        labels: ["快晴", "晴れ", "曇り", "雨", "嵐"],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#ea5550",
              "#f3981d",
              "#b2cbe4",
              "#68a4d9",
              "#0075c2",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          display: false,
        },
      },
    };
  },
  methods: {
    convertChartData(responseData) {
      var resultArray = [];
      resultArray.push(responseData.clearCount);
      resultArray.push(responseData.sunnyCount);
      resultArray.push(responseData.cloudyCount);
      resultArray.push(responseData.rainyCount);
      resultArray.push(responseData.stormyCount);
      return resultArray;
    },
    getAggregateByDay() {
      axios
        .post("/getAggregateByDay", {
          date: this.selectedDate,
        })
        .then((response) => {
          (this.conChartData.datasets[0].data = this.convertChartData(
            response.data.condition
          )),
            (this.motivChartData.datasets[0].data = this.convertChartData(
              response.data.motivation
            )),
            (this.perfoChartData.datasets[0].data = this.convertChartData(
              response.data.performance
            ));
          this.isGetData = true;
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
  watch: {
    selectedDate: () => {
      this.getAggregateByDay();
    },
  },
  mounted() {
    this.getAggregateByDay();
  },
};
</script>
