<template>
  <!-- <v-container id="depName">
    <v-row align="center">
      <v-col class="d-flex" cols="14" sm="3">
        <v-select
          :items="depName"
          label="部署名"
          v-model="filterDepName"
          @change="changeDepName()"
        ></v-select>
      </v-col>
    </v-row>
  </v-container> -->
<el-select v-model="inputDepName" clearable @change="changeDepName()" placeholder="部署名">
    <el-option
      v-for="depName in depNames"
      :key="depName.value"
      :label="depName.label"
      :value="depName.value">
    </el-option>
  </el-select>  
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
       

      depNames: [{
        
       value: "アプリエンジニア",
       label: "アプリエンジニア"
       },
     {
        value: "クラウドエンジニア",
        label: "クラウドエンジニア"
    },
     {
        value: "機械学習エンジニア",
        label: "機械学習エンジニア"
  },
     {
       value: "内勤",
       label: "内勤"
     },
     {
        value: "全ての社員",
        label: "全ての社員"
      }
      ],
      filterDepName: "",

      
        inputDepName:"",
        
       
      

      filteredEmployeeList: {},
    };
  },
  computed: {
    ...mapGetters(["filterEmployeeList"]),
  },
  created(){
    this.$store.dispatch("setFilterDepName",this.inputDepName)
  },
  beforeDestroy() {
    // this.$store.dispatch("setFilterDepName", "");

    this.$store.dispatch("setFilterDepName", "");
  },
  methods: {
    //従業員絞り込み用のメソッド
    changeDepName() {
      // this.$store.dispatch("setFilterDepName", this.filterDepName);
      // console.log("2:filterの中身" + this.$store.state.filterDepName);

      this.$store.dispatch("setFilterDepName",this.inputDepName)
    },
  },
};
</script>
<style></style>
