<template>
  <b-col>
    <h2 class="mb-4">従業員一覧 </h2>

    <SearchByDepName></SearchByDepName>

    <EmployeeListHeader class="mb-5" />
    <EmployeeList :employee-list="childEmployeeList" />
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
      childEmployeeList: [],

      //絞り込み検索用
      filterDepName: "",
    };
  },

  methods: {
    getMasterList() {
      this.masterList = this.$store.state.employeeList;
    },
  },
  computed: {
    getFilterDepName: function() {
      return this.$store.state.filterDepName;
    },
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
            dep: elm.depId,
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
            dep: elm.depId,
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
      this.childEmployeeList = employeeList;
    },
    getFilterDepName: function() {
      console.log("watcher");

      //部署名で検索
      if (this.$store.state.filterDepName !== "") {
        if (this.$store.state.filterDepName === "全ての社員") {
          console.log("全ての社員"+this.childEmployeeList)
           this.childEmployeeList = this.employeeList
        } else {
          this.childEmployeeList = this.employeeList.filter((employee) => {
            if (employee.dep === this.$store.state.filterDepName) {
              console.log("部署ごと"+employee)
              return employee;
            }
          });
        }
       
      }
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
      })
      .catch((e) => {
        alert("従業員一覧を取得するAPIとの通信に失敗しました:" + e);
      });
    //filterDepNameの初期値をstateに格納
    // this.$store.dispatch("setFilterDepName", this.filterDepName);
    console.log("1:stateのfilterQueryの中身" + this.$store.state.filterDepName);
  },
};
</script>
