<template>
  <v-container id="depName">
    <v-row align="left">
      <v-col class="d-flex" cols="14" sm="6">
        <v-select
          :items="depName"
          label="部署名"
          v-model="filterDepName"
          @change="handleChangeQuery()"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      depName: [
        "アプリエンジニア",

        "クラウドエンジニア",

        "機械学習エンジニア",

        "内勤",

        "全ての社員"
      ],
      filterDepName: "",

      filteredEmployeeList: {},
    };
  },
  computed: {
    ...mapGetters(["filterEmployeeList"]),
  },
  beforeDestroy() {
    this.$store.dispatch("setFilterDepName", "");
  },
  methods: {
    //従業員絞り込み用のメソッド
    handleChangeQuery() {
      
      this.$store.dispatch("setFilterDepName", this.filterDepName);
      console.log("2:filterQueryの中身" + this.$store.state.filterDepName);
      //従業員リストを部署名と入社年月で絞り込む

      // let data = this.$store.state.employeeList;

      // 部署名で検索
      // if (this.$store.state.filterQuery !== "") {
      //   data = data.filter(
      //    (employeeList) => employeeList.dep.depName === this.$store.state.filterQuery
      //   );
      // }
      // this.$store.dispatch("employeeList",this.filterEmployeeList)
      // console.log(this.$store.state.employeeList)
      // console.log(this.filterEmployeeList)
    },
  },
  // mounted() {
  //   //filterQueryの初期値をstateに格納
  //   this.$store.dispatch("setFilterQuery", this.filterQuery);
  //   console.log('2番目')
  // },
};
</script>
<style>


</style>