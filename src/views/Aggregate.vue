<template>
  <div>
    <Menubotton id="Menubotton"></Menubotton>
    <Aggregate />
    <ConPieChart
      class="Pie"
      :con-chart-data="ConChartData"
      :isGetData="isGetData"
    ></ConPieChart><br>
    <MotivPieChart
      class="Pie"
      :motiv-chart-data="MotivChartData"
    ></MotivPieChart>
    <PerfoPieChart 
      class="Pie"
      :perfo-chart-data="PerfoChartData"
      ></PerfoPieChart> 
    
    <AdminSideNav />
  </div>
</template>

<script>
import Aggregate from "../components/Aggregate.vue";
import AdminSideNav from "../components/AdminSideNav.vue";
import axios from "axios";
import Menubotton from "../components/Menubotton";
import ConPieChart from "../components/ConPieChart";
import MotivPieChart from "../components/MotivPieChart";
import PerfoPieChart from "../components/PerfoPieChart";

export default {
  components: {
    Aggregate,
    AdminSideNav,
    Menubotton,
    ConPieChart,
    MotivPieChart,
    PerfoPieChart,
  },

  data() {
    return {
      // isGetData: false,
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
              "red",
              "blue",
              "green",
              "white",
              "yellow",
              "white",
              "black",
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
      // options: {
      //   responsive: true,
      //   legend: {
      //     position: "left",
      //     labels: {
      //       fontSize: 15,
      //     },
      //   },
      // },
      
    }
  },
  mounted() {
    axios
      .get("http://localhost:8080/getAggregateByDay?date=2020/04/27")
      .then((response) => {
        this.ConChartData.datasets[0].data = this.convertChartData(
          response.data.condition
        ),

        this.MotivChartData.datasets[0].data = this.convertChartData(
          response.data.motivation
        ),
        this.PerfoChartData.datasets[0].data = this.convertChartData(
            response.data.performance
        );
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
      console.log(responseData)
   
      return resultArray;
    },
  },
  // mounted(){
  //   this.$store.dispatch('getAggregate')
  // }
};
</script>

<style>
.Pie {
  position: relative;
  top: 60px;
  left: 10px;
  width: 500px;
  height: 500px;
}
</style>
