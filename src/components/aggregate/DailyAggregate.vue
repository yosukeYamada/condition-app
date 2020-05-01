<template>
  <div id="content">
    <h2 class="mb-4">集計グラフ</h2>
    <b-row>
      <b-col>
        {{ selectedDate }}
        <label for="example-datepicker">表示する日付を選択してください</label>
        <b-form-datepicker
          id="example-datepicker"
          v-model="selectedDate"
          class="mb-2"
        ></b-form-datepicker>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="4">
        <b-card>
          <MotivPieChart
            :motiv-chart-data="MotivChartData"
            :is-get-data="isGetData"
          ></MotivPieChart>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card>
          <ConPieChart
            :con-chart-data="ConChartData"
            :isGetData="isGetData"
          ></ConPieChart>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card>
          <PerfoPieChart
            :perfo-chart-data="PerfoChartData"
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
  data() {
    return {
      selectedDate: "",
      isGetData: false,
      ConChartData: {
        labels: ["快晴", "晴れ", "曇り", "雨", "大雨"],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#f87979",
              "#aa4c8f",
              "#38b48b",
              "#006e54",
              "#c1e4e9",
              "#89c3eb",
              "#c3d825",
            ],
          },
        ],
      },
      MotivChartData: {
        labels: ["快晴", "晴れ", "曇り", "雨", "大雨"],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#f87979",
              "#aa4c8f",
              "#38b48b",
              "#006e54",
              "#c1e4e9",
              "#89c3eb",
              "#c3d825",
            ],
          },
        ],
      },
      PerfoChartData: {
        labels: ["快晴", "晴れ", "曇り", "雨", "大雨"],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#f87979",
              "#aa4c8f",
              "#38b48b",
              "#006e54",
              "#c1e4e9",
              "#89c3eb",
              "#c3d825",
            ],
          },
        ],
      },
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/getAggregateByDay?date=2020/04/27")
      .then((response) => {
        (this.ConChartData.datasets[0].data = this.convertChartData(
          response.data.condition
        )),
          (this.MotivChartData.datasets[0].data = this.convertChartData(
            response.data.motivation
          )),
          (this.PerfoChartData.datasets[0].data = this.convertChartData(
            response.data.performance
          ));
        this.isGetData = true;
      })
      .catch((e) => {
        alert(e);
      });
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
  },
};
</script>
