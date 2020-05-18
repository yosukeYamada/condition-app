<template>
  <b-col>
    <h2 class="mb-4">従業員一覧</h2>

    <SearchByDepName></SearchByDepName>
    <SearchByHireYear></SearchByHireYear>
    <SearchByHireMonth></SearchByHireMonth>
    <!-- <Test></Test> -->

    <EmployeeListHeader class="mb-5" />
    <EmployeeList :employee-list="childEmployeeList" />
  </b-col>
</template>

<script>
import moment from "moment";
import EmployeeListHeader from "@/components/employee-list/EmployeeListHeader.vue";
import EmployeeList from "../components/employee-list/EmployeeList.vue";
import SearchByDepName from "../components/employee-list/SearchByDepName";
import SearchByHireYear from "../components/employee-list/SearchByHireYear";
import SearchByHireMonth from "../components/employee-list/SearchByHireMonth";
// import Test from "../components/employee-list/Test";

export default {
  components: {
    EmployeeListHeader,
    EmployeeList,
    SearchByDepName,
    SearchByHireYear,
    SearchByHireMonth,
    // Test
  },
  data() {
    return {
      masterList: [],
      employeeList: [],
      childEmployeeList: [],
    };
  },

  methods: {
    getMasterList() {
      this.masterList = this.$store.state.employeeList;
    },
  },

  //watcherのメソッドを算出
  computed: {
    getFilter: function() {
      return this.$store.state.filter;
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

    getFilter: {
      handler: function() {
        console.log(this.$store.state.depList)
        this.childEmployeeList = this.employeeList;

        if (this.$store.state.filter.depName !== "") {
          console.log("部署" + this.$store.state.filter.depName);
          this.childEmployeeList = this.childEmployeeList.filter((employee) => {
            if (employee.dep === this.$store.state.filter.depName) {
              console.log("部署ごと" + employee);
              return employee;
            }
          });
        }
        if (this.$store.state.filter.hireYear !== "") {
          console.log("入社年" + this.$store.state.filter.hireYear);
          console.log("childEmployeeList" + this.childEmployeeList);
          this.childEmployeeList = this.childEmployeeList.filter((employee) => {
            console.log("employeeHiredata" + employee.hireDate);
            if (
              employee.hireDate.substr(0, 4) ===
              this.$store.state.filter.hireYear
            ) {
              console.log("入社年はこれ" + employee.hireDate.substr(0, 4));

              return employee;
            }
          });
        }

        if (this.$store.state.filter.hireMonth !== "") {
          this.childEmployeeList = this.childEmployeeList.filter((employee) => {
            if (
              parseInt(moment(employee.hireDate).format("M")) ===
              this.$store.state.filter.hireMonth
            ) {
              console.log(
                "入社月は" + parseInt(moment(employee.hireDate).format("M"))
              );
              console.log("入社月はこちら" + employee.hireDate);
              return employee;
            }
          });
        }
      },
      deep: true,
    },
  },
  created() {
    this.getMasterList();
  },
};
</script>
