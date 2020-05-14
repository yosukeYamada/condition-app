<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="depName"
          label="部署名"
          v-model="filterQuery.depName"
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
      ],
      filterQuery: {
        depName: "",
      },

      filteredEmployeeList: {},
    };
  },
  computed: {
    ...mapGetters(["filterEmployeeList"]),
  },
  methods: {
      
    //従業員絞り込み用のメソッド
    handleChangeQuery() {
      this.$store.dispatch("setFilterQuery", this.filterQuery.depName);
      //従業員リストを部署名と入社年月で絞り込む

      // let data = this.$store.state.employeeList;

      // 部署名で検索
      // if (this.$store.state.filterQuery !== "") {
      //   data = data.filter(
      //    (employeeList) => employeeList.dep.depName === this.$store.state.filterQuery
      //   );
      // }
      this.$store.dispatch("setData",this.filterEmployeeList)
      console.log(this.$store.state.employeeList)
    },
  },
  mounted() {
    //filterQueryの初期値をstateに格納
    this.$store.dispatch("setFilterQuery", this.filterQuery);
    console.log('１番目')
  },
};
</script>
