<template>
  <b-col>
    <h2 class="mb-4">従業員一覧</h2>

    <SearchByDepName ></SearchByDepName>
   
    
    <EmployeeListHeader class="mb-5" />
    <EmployeeList :employee-list="employeeList" />
  </b-col>
</template>

<script>
import moment from "moment";
import EmployeeListHeader from "@/components/employee-list/EmployeeListHeader.vue";
import EmployeeList from "../components/employee-list/EmployeeList.vue";
import axios from "axios";
// import { mapGetters } from "vuex";
import SearchByDepName from "../components/employee-list/SearchByDepName";

export default {
  components: {
    EmployeeListHeader,
    EmployeeList,
    SearchByDepName,
  },
  data() {
    return {
      masterList: [],
      employeeList: [],
      //絞り検索用
      
      
    };
  },
  // computed: {
  //   ...mapGetters('employeeList', ['filteredEmployeeList']),
    
  // },
  methods: {
    getMasterList() {
      this.masterList = this.$store.state.employeeList;
    },

    //従業員絞り込み用のメソッド
    // handleChangeQuery() {
    //   this.setFilterQuery(this.filterQuery.depName);
    // },
  },
  watch: {
    masterList: function() {
      var masterList = this.masterList;
      var employeeList = masterList.map(function(elm) {
        let hireDate = moment(elm.hireDate).format("YYYY-MM");
        if (elm.dailyPost.length === 0) {
          return {
            userId: elm.userId,
            name: elm.userName,
            dep: elm.dep.depName,
            hireDate: hireDate,
            lastPostDate: "未登録",
            motivation: "未登録",
            condition: "未登録",
            performance: "未登録",
            comment: "",
          };
        } else {
          return {
            userId: elm.userId,
            name: elm.userName,
            dep: elm.dep.depName,
            hireDate: hireDate,
            lastPostDate: moment(elm.dailyPost[0].date).format("YYYY-MM-DD"),
            motivation:
              elm.dailyPost[0].postedMotivation.motivation.motivationName,
            condition: elm.dailyPost[0].postedCondition.condition.conditionName,
            performance:
              elm.dailyPost[0].postedPerformance.performance.performanceName,
            comment: elm.dailyPost[0].postedComment.comment,
          };
        }
      });
      this.employeeList = employeeList;
    },
  },

  created() {
    this.getMasterList();

    //全従業員情報を取得
    axios
      .get("/showEmployeeList")
      .then((response) => {
        this.$store.dispatch("employeeList", response.data);
        // if(this.$store.state.filterQuery !== ""){
        //   console.log(this.$sotre.state.filterQuery)
        //   let filterEmployee =this.$store.state.employeeList.filter(
        //     (employeeList) => employeeList.dep.depName === this.$store.state.filterQuery
        //   )
        //  this.$store.dispatch("setData",filterEmployee)
        // }
         console.log('1番目')
      })
      .catch((e) => {
        alert("従業員一覧を取得するAPIとの通信に失敗しました:" + e);
      });
    //filterQueryの初期値をstateに格納
    // this.$store.dispatch("setFilterQuery", this.filterQuery);
  },
};
</script>
