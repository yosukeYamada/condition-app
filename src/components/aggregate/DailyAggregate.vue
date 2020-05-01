<template>
  <div id="content">
    <h2 class="mb-4">集計グラフ</h2>
    <div>表示する日付を選択してください</div>
    <b-row>
      <b-col>
        <b-form-select
          v-model="selectedYear"
          :options="yearOptions"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-form-select
          v-model="selectedMonth"
          :options="monthOptions"
        ></b-form-select>
      </b-col>
    </b-row>
    <b-row>
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
          <MotivPieChart
            :motiv-chart-data="MotivChartData"
            :is-get-data="isGetData"
          ></MotivPieChart>
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
      selectedYear: null,
      yearOptions: [
        { value: null, text: "年を選択", disabled: true },
        { value: "2020", text: "2020" },
        { value: "2021", text: "2021" },
        { value: "2022", text: "2022" },
        { value: "2023", text: "2023" },
        { value: "2024", text: "2024" },
      ],
      selectedMonth: null,
      monthOptions: [
        { value: null, text: "月を選択", disabled: true },
        { value: "01", text: "01" },
        { value: "02", text: "02" },
        { value: "03", text: "03" },
        { value: "04", text: "04" },
        { value: "05", text: "05" },
        { value: "06", text: "06" },
        { value: "07", text: "07" },
        { value: "08", text: "08" },
        { value: "09", text: "09" },
        { value: "10", text: "10" },
        { value: "11", text: "11" },
        { value: "12", text: "12" },
      ],
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
