<template>
  <!-- <v-container id="hireMonth">
    <v-row align="center">
      <v-col class="d-flex" cols="14" sm="3">
        <v-select
          :items="hireMonth"
          label="入社月"
          v-model="filterHireMonth"
          @change="changeHireMonth()"
        ></v-select>
      </v-col>
    </v-row>
  </v-container> -->
  <el-select v-model="inputHireMonth" clearable @change="changeHireMonth()" placeholder="入社した月">
    <el-option
      v-for="month in hireMonth"
      :key="month.value"
      :label="month.label"
      :value="month.value">
    </el-option>
  </el-select>  
</template>
<script>
export default {
  data() {
    return {
      hireMonth: [{
          value:1,
          label:1
      },{   
          value:2,
          label: 2
      },{
          value:3,
          label:3
      },{
          value:4,
          label:4
      },{
          value:5,
          label:5
      },{
          value:6,
          label:6
      },{
          value:7,
          label:7
      },{
          value:8,
          label:8

      },{
          value:9,
          label:9
      },{
          value:10,
          label:10
      },{
          value:11,
          label:11
      },{
          value:12,
          label:12
      }
       
      ],
      filterHireMonth:"",

      
        
        
        inputHireMonth: ""
        
      
    };
  },

  mounted(){
    this.$store.dispatch("setFilterHireMonth",this.inputHireMonth)

  },

  beforeDestroy() {
    // this.$store.dispatch("setFilterHireMonth", "");
    this.$store.dispatch("setFilterHireMonth","")
  },
  
  methods: {
    //従業員絞り込み用のメソッド
    changeHireMonth() {
      // this.$store.dispatch("setFilterHireMonth", this.filterHireMonth);
      // console.log("2:filterQueryの中身" + this.$store.state.filterHireMonth);

      this.$store.dispatch("setFilterHireMonth",this.inputHireMonth)
    },
  },
};
</script>
<style></style>