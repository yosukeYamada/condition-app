<template>
  <b-container class="mt-5">
    <BreadCrumbs :items="items" />
    <b-row align-v="center" align-h="center">
      <b-col>
        <div class="headline mb-4">ユーザー情報の更新・削除</div>
        <b-row>
          <b-col cols="12" sm="10" md="10" lg="6">
            <SearchByUserName></SearchByUserName>
          </b-col>
          <b-col cols="10" sm="4" md="3" lg="2">
            <SearchByDepName></SearchByDepName>
          </b-col>
          <b-col cols="6" sm="4" md="3" lg="2">
            <SearchByHireYear></SearchByHireYear>
          </b-col>
          <b-col cols="6" sm="4" md="3" lg="2">
            <SearchByHireMonth></SearchByHireMonth>
          </b-col>
        </b-row>
        <UpdateUser :employee-list="childEmployeeList" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";
import UpdateUser from "../components/admin-setting/UpdateUser";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
import SearchByDepName from "../components/employee-list/SearchByDepName";
import SearchByHireYear from "../components/employee-list/SearchByHireYear";
import SearchByHireMonth from "../components/employee-list/SearchByHireMonth";
import SearchByUserName from "../components/update/SearchByUserName";

export default {
  components: {
    UpdateUser,
    BreadCrumbs,
    SearchByDepName,
    SearchByHireYear,
    SearchByHireMonth,
    SearchByUserName,
  },
  data() {
    return {
      masterList: [],
      employeeList: [],
      childEmployeeList: [],
      items: [
        {
          text: "管理者設定",
          disabled: false,
          path: "/adminSetting",
          class: [],
        },
        {
          text: "ユーザー情報の更新・削除",
          disabled: true,
          path: "",
          class: ["grey--text"],
        },
      ],
    };
  },
  computed: {
    getFilter: function() {
      return this.$store.state.filter;
    },
  },
  methods: {
    getMasterList() {
      this.masterList = this.$store.state.employeeList;
    },
  },
  watch: {
    masterList: function() {
      var masterList = this.masterList;
      var employeeList = masterList.map(function(elm) {
        let hireDate = moment(elm.hireDate).format("YYYY-MM");
        return {
          userId: elm.userId,
          name: elm.userName,
          kana: elm.userNameKana,
          mail: elm.mailList[0].mailName,
          depId: elm.depId,
          hireDate: hireDate,
          version: elm.version,
          status: elm.status
        };
      });
      this.employeeList = employeeList;
      this.childEmployeeList = employeeList;
    },
    getFilter: {
      handler: function() {
        this.childEmployeeList = this.employeeList;

        if (this.$store.state.filter.filter.userName !== "") {
          this.childEmployeeList = this.childEmployeeList.filter((employee) => {
            if (
              employee.name.indexOf(
                this.$store.state.filter.filter.userName
              ) !== -1
            ) {
              return employee;
            }
          });
        }

        if (this.$store.state.filter.filter.depName !== "") {
          this.childEmployeeList = this.childEmployeeList.filter((employee) => {
            if (employee.depId === this.$store.state.filter.filter.depName) {
              return employee;
            }
          });
        }
        if (this.$store.state.filter.filter.hireYear !== "") {
          this.childEmployeeList = this.childEmployeeList.filter((employee) => {
            if (
              employee.hireDate.substr(0, 4) ===
              this.$store.state.filter.filter.hireYear
            ) {
              return employee;
            }
          });
        }

        if (this.$store.state.filter.filter.hireMonth !== "") {
          this.childEmployeeList = this.childEmployeeList.filter((employee) => {
            if (
              parseInt(moment(employee.hireDate).format("M")) ===
              this.$store.state.filter.filter.hireMonth
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
