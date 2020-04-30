<template>
  <div>
    <Aggregate />
    <AdminSideMenu />
    <span v-for="aggregate in this.$store.state.aggregates" v-bind:key=aggregate.id>
      {{aggregate}}
      </span>
   
  </div>
</template>

<script>
import Aggregate from "../components/Aggregate.vue";
import AdminSideMenu from "../views/AdminSideMenu";
import axios from "axios";

export default {
  components: {
    Aggregate,
    AdminSideMenu,
  },
  data() {
    return {
      agreegate: null,
    };
  },
  created() {
    console.log("aaaa")
    axios.get("http://localhost:8080/getAggregateByDay?date=2020/04/27").then((response) => {
      console.log(response.data);
    }).catch(e=>{
      alert(e)
    });
    
  },
  // mounted(){
  //   this.$store.dispatch('getAggregate')
  // }
};
</script>
