<template>
  <div>
    <Menubotton id="Menubotton"></Menubotton>
    <Aggregate />
    <ConPieChart class="Pie"></ConPieChart>
    <AdminSideNav />
    <span v-for="aggregate in this.$store.state.aggregates" v-bind:key=aggregate.id>
      {{aggregate}}
      </span>
   
  </div>
</template>

<script>
import Aggregate from "../components/Aggregate.vue";
import AdminSideNav from "../components/AdminSideNav.vue";
import axios from "axios";
import Menubotton from "../components/Menubotton";
import ConPieChart from "../components/ConPieChart";


export default {
  components: {
    Aggregate,
    AdminSideNav,
    Menubotton,
    ConPieChart
  },
  data() {
    return {
      datas: {
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
      options: {
        responsive: true,
        legend: {
          position: "left",
          labels: {
            fontSize: 15,
          },
        },
      },
    };
  },
  created() {
    console.log("aaaa")
    axios.get("http://localhost:8080/getAggregateByDay?date=2020/04/27").then((response) => {
      this.data = response.data
    }).catch(e=>{
      alert(e)
    });
    
  },
  // mounted(){
  //   this.$store.dispatch('getAggregate')
  // }
};
</script>

<style>
.Pie{
  position:absolute;
  top:60px;
  left:10px;
  width:500px;
  height:500px;
}





</style>
