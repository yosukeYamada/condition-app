<template>
  <b-container>
    <BreadCrumbs :items="items" />
    <b-row align-v="center" align-h="center">
      <b-col>
        <b-row>
          <b-col sm="8" lg="5" md="6">
            <b-card class="py-0 px-2">
              <b-row>
                <b-col class="py-0" cols="8" sm="8" md="8" lg="8">
                  <b-card-title>
                    {{ employee.userName }}
                  </b-card-title>
                  <b-card-sub-title class="mb-3">{{
                    transferDepName(employee.depId)
                  }}</b-card-sub-title>
                  <b-card-sub-title
                    >{{ employee.hireDate | moment }}入社</b-card-sub-title
                  >
                </b-col>
                <b-col class="py-0" cols="4" sm="3" md="4" lg="4">
                  <v-fa
                    class="text-secondary"
                    :icon="['fas', 'user-circle']"
                    size="5x"
                    >mdi-account-circle</v-fa
                  >
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <EmployeeConditionList />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";
import EmployeeConditionList from "@/components/employee-condition/EmployeeConditionList.vue";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
export default {
  components: {
    EmployeeConditionList,
    BreadCrumbs,
  },
  data() {
    return {
      employee: {},
      items: [
        {
          text: "従業員一覧",
          disabled: false,
          path: "/employeeList",
          class: [],
        },
        {
          text: "コンディション履歴",
          disabled: true,
          path: "",
          class: ["grey--text"],
        },
      ],
    };
  },
 

  filters: {
    moment: function(date) {
      return moment(date).format("YYYY年MM月");
    },
  },
  methods: {
    
    /** 部署IDを部署名に変換するメソッド */
    transferDepName(depId) {
      let dep = this.$store.state.depList.find((dep) => dep.depId === depId);
      return dep.depName;
    },
  },
  mounted() {
    this.employee = this.$store.state.employeeList.find(
      (elm) => elm.userId === JSON.parse(decodeURIComponent(this.$route.query.item)).userId
    );
    console.log(this.employee[0])
    this.items[1].text = this.employee.userName + "のコンディション履歴";
  },
};
</script>
