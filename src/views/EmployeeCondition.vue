<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <h4>
        {{
          this.$store.state.employeeList.filter(
            (elm) => elm.userId === this.$route.params.userId
          )[0].hireDate | moment
        }}入社
        {{
          this.$store.state.employeeList.filter(
            (elm) => elm.userId === this.$route.params.userId
          )[0].dep.depName
        }}
        {{
          this.$store.state.employeeList.filter(
            (elm) => elm.userId === this.$route.params.userId
          )[0].userName
        }}のコンディション履歴
      </h4>
      <EmployeeConditionList />
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";
import EmployeeConditionList from "@/components/employee-condition/EmployeeConditionList.vue";
export default {
  components: {
    EmployeeConditionList,
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY年MM月");
    },
  },
};
</script>
