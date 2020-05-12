<template>
  <div id="content">
    <b-row>
      <b-col sm="4">
        <b-card>
          <MotivPieChart
            :chart-data="motivChartData"
            :options="options"
            :is-get-data="isGetData"
          ></MotivPieChart>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card>
          <ConPieChart
            :chart-data="conChartData"
            :options="options"
            :isGetData="isGetData"
          ></ConPieChart>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card>
          <PerfoPieChart
            :chart-data="perfoChartData"
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
const labels = ["快晴", "晴れ", "曇り", "雨", "嵐"];
const backgroundColor = ["#ea5550", "#f3981d", "#b2cbe4", "#68a4d9", "#0075c2"];

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
        labels: labels,
        datasets: [
          {
            data: [],
            backgroundColor: backgroundColor,
          },
        ],
      },
      motivChartData: {
        labels: labels,
        datasets: [
          {
            data: [],
            backgroundColor: backgroundColor,
          },
        ],
      },
      perfoChartData: {
        labels: labels,
        datasets: [
          {
            data: [],
            backgroundColor: backgroundColor,
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
          this.conChartData.datasets[0].data = this.convertChartData(
            response.data.condition
          );
          this.motivChartData.datasets[0].data = this.convertChartData(
            response.data.motivation
          );
          this.perfoChartData.datasets[0].data = this.convertChartData(
            response.data.performance
          );
          this.isGetData = this.isGetData ? false : true;
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
  watch: {
    selectedDate: {
      handler: function() {
        this.getAggregateByDay();
      },
    },
  },
  created() {
    this.getAggregateByDay();
  },
};
</script>
