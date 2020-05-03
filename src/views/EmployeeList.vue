<template>
  <b-col>
    <b-card class="m-5" border-variant="success" 
      header="従業員一覧"
      header-bg-variant="success"
      header-text-variant="white"
    style="border-width:2px;">
      <EmployeeListHeader class="mb-5" />
      <EmployeeList :employee-list="employeeList" />
    </b-card>
  </b-col>
</template>

<script>
import EmployeeListHeader from "@/components/employee-list/EmployeeListHeader.vue";
import EmployeeList from "../components/employee-list/EmployeeList.vue";
import axios from "axios";

export default {
  components: {
    EmployeeListHeader,
    EmployeeList,
  },
  data() {
    return {
      masterList: [],
      employeeList: [],
    };
  },
  methods: {
    getMasterList() {
      axios
        .get("http://localhost:8080/showEmployeeList")
        .then((response) => {
          this.masterList = response.data;
        })
        .catch((e) => {
          alert("従業員一覧を取得するAPIとの通信に失敗しました:" + e);
        });
    },
  },
  watch: {
    masterList: function() {
      var masterList = this.masterList;
      var employeeList = masterList.map(function(elm) {
        let hireDate = new Date(Date.parse(elm.hireDate));
        hireDate =
          hireDate.getFullYear() +
          " - " +
          ("00" + (hireDate.getMonth() + 1)).slice(-2);
        if (elm.dailyPost.length === 0) {
          return {
            userId:elm.userId,
            name: elm.userName,
            dep: elm.dep.depName,
            hireDate: hireDate,
            motivation: "未登録",
            condition: "未登録",
            performance: "未登録",
            comment: "",
          };
        } else {
          return {
            userId:elm.userId,
            name: elm.userName,
            dep: elm.dep.depName,
            hireDate: hireDate,
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
  },
};
</script>
