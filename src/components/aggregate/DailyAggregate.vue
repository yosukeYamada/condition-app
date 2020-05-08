<template>
  <div id="content">
    <h2 class="mb-4">集計グラフ</h2>
    <b-row>
      <b-col sm="4" class="pb-0">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="selectedDate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="selectedDate"
              label="表示する日付を選択してください"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="selectedDate" locale="ja-ja" :day-format="date => new Date(date).getDate()" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(selectedDate)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="4">
        <b-card>
          <MotivPieChart
            :motiv-chart-data="MotivChartData"
            :options="options"
            :is-get-data="isGetData"
          ></MotivPieChart>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card>
          <ConPieChart
            :con-chart-data="ConChartData"
            :options="options"
            :isGetData="isGetData"
          ></ConPieChart>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card>
          <PerfoPieChart
            :perfo-chart-data="PerfoChartData"
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
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10),
      menu: false,
      isGetData: false,
      ConChartData: {
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
      MotivChartData: {
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
      PerfoChartData: {
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
  mounted() {
    axios
      .get("/getAggregateByDay?date=2020/04/27")
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
