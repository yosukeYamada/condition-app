<template>
  <div>
    <b-button variant="outline-success" @click="search()">検索</b-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    search() {
      axios.post("/getAggregateByDay", {
        date: this.$store.state.aggregate.date,
        depId : this.$store.state.aggregate.depId
      }).then((response) => {
        this.$store.dispatch('aggregate/setResponseDayData', response.data)
      })
      
      axios.post("/getAggregateByMonth", {
        date: this.$store.state.aggregate.date,
        depId : this.$store.state.aggregate.depId
      }).then((response) => {
        this.$store.dispatch('aggregate/setResponseMonthData', response.data)
      })

    },
  }
}
</script>