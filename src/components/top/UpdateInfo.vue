<template>
  <b-col>
    <v-card class="px-1" tile outlined style="border-width:4px;">
      <v-card-text class="mt-2">
        
        <div class="headline font-weight-black mb-4">{{ title }}</div>

        <div v-for="(info, i) in information" :key="i" class="mb-2">
          <div class="font-weight-black">
            {{ info.informationDate | moment}}
          <b-row class="px-4" v-for="(category, i) in info.category" :key="i">
            <div class="px-2 mt-2 mr-4 name" :style="style">
              {{ category.categoryName }}
            </div>
            <div class="py-2">
              {{ info.informationTitle }}
            </div>
          </b-row>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </b-col>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      title: "News",
      style: { backgroundColor: "#28A745", height: "22px", width: "118px", color: "white" },
      information:[]
    };
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD");
    }
  },
  created() {
    var informationList = []
    for(  var num in this.$store.state.information  ) {
      var information = 
      { informationId: "", informationTitle:"",informationDate:"",category:[] }
      information.informationId = this.$store.state.information[num].informationId
      information.informationTitle = this.$store.state.information[num].informationTitle
      information.informationDate = this.$store.state.information[num].informationDate
      information.category = this.$store.state.category.filter(
        (category) => category.categoryId === this.$store.state.information[num].categoryId)
      informationList.push(information)
    }
    this.information = informationList
  }
}
</script>

<style scoped>
  .name {
    text-align: center;
  }
</style>