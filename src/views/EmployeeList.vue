<template>
  <b-container fluid class="mt-5">
    <b-row align-v="center" align-h="center">
      <b-col lg="11">
        <div class="headline mb-4">従業員一覧</div>
        <b-row>
          <b-col cols="12" sm="4" md="4" lg="3">
            <SearchByDepName></SearchByDepName>
          </b-col>
          <b-col cols="6" sm="4" md="3" lg="2">
            <SearchByHireYear></SearchByHireYear>
          </b-col>
          <b-col cols="6" sm="4" md="3" lg="2">
            <SearchByHireMonth></SearchByHireMonth>
          </b-col>
        </b-row>
        <EmployeeList :employee-list="childEmployeeList" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";
import EmployeeList from "@/components/employee-list/EmployeeList.vue";
import SearchByDepName from "@/components/employee-list/SearchByDepName";
import SearchByHireYear from "@/components/employee-list/SearchByHireYear";
import SearchByHireMonth from "@/components/employee-list/SearchByHireMonth";
import { mapActions } from "vuex";

export default {
  components: {
    EmployeeList,
    SearchByDepName,
    SearchByHireYear,
    SearchByHireMonth,
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
    ...mapActions(["getEmployeeList"]),
  },

  //watcherのメソッドを算出
  computed: {
    getFilter: function() {
      // return this.$store.state.filter;
      return this.$store.state.filter.filter
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
        this.childEmployeeList = this.employeeList;
        if (this.$store.state.filter.filter.depName !== "") {
          this.childEmployeeList = this.childEmployeeList.filter((employee) => {
            if (employee.dep === this.$store.state.filter.filter.depName) {
              return employee;
            }
          });
        }
        if (this.$store.state.filter.hireYear !== "") {
          this.childEmployeeList = this.childEmployeeList.filter((employee) => {
            if (
              employee.hireDate.substr(0, 4) ===
              this.$store.state.filter.hireYear
            ) {
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
