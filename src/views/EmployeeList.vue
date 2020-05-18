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
import axios from "axios";
// import { mapGetters } from "vuex";
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

      // //絞り込み検索用
      // filterDepName: "",
    };
  },

  methods: {
    getMasterList() {
      this.masterList = this.$store.state.employeeList;
    },
  },

  //watcherのメソッドを算出
  computed: {
    // getFilterDepName: function() {
    //   return this.$store.state.filterDepName;
    // },
    // getFilterHireYear: function() {
    //   return this.$store.state.filterHireYear;
    // },
    // getFilterHireMonth: function() {
    //   return this.$store.state.filterHireMonth;
    // },
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
      this.childEmployeeList = employeeList;
    },
    // getFilterDepName: function() {
    //   console.log("watcher");
    //   console.log(this.$store.state.filterDepName);
    //   //部署名で検索

    //   if (this.$store.state.filterDepName === "") {
    //     console.log("1");
    //     //検索欄から部署名は消したが、入社年または入社月が残っている場合はそれでフィルターをかける
    //     if (
    //       this.$store.state.filterHireYear !== "" ||
    //       this.$store.state.filterHireMonth !== ""
    //     ) {
    //       console.log("2");
    //       this.childEmployeeList = this.employeeList.filter((employee) => {
    //         if (
    //           moment(employee.hireDate).format("YYYY") ===
    //           this.$store.state.filterHireYear
    //         ) {
    //           console.log("3");
    //           var data = this.$store.state.filterHireMonth;
    //           if (parseInt(moment(employee.hireDate).format("M")) === data) {
    //             return employee;
    //           }
    //         }
    //       });
    //     }
    //   } else if (this.$store.state.filterDepName !== "") {
    //     this.childEmployeeList = this.employeeList.filter((employee) => {
    //       if (employee.dep === this.$store.state.filterDepName) {
    //         // console.log("部署ごと" + employee);
    //         return employee;
    //       }
    //     });
    //   }
    // },
    // getFilterHireYear: function() {
    //   //入社月で検索
    //   if (this.$store.state.filterHireYear === "") {
    //     console.log("watcher");

    //     this.childEmployeeList = this.employeeList;
    //   } else {
    //     this.childEmployeeList = this.employeeList.filter((employee) => {
    //       if (
    //         moment(employee.hireDate).format("YYYY") ===
    //         this.$store.state.filterHireYear
    //       ) {
    //         console.log("入社年" + employee.hireDate);
    //         return employee;
    //       }
    //     });
    //   }
    // },
    // getFilterHireMonth: function() {
    //   //入社月で検索
    //   if (this.$store.state.filterHireMonth === "") {
    //     this.childEmployeeList = this.employeeList;
    //   } else {
    //     var data = this.$store.state.filterHireMonth;
    //     console.log("dataの中身" + data);
    //     this.childEmployeeList = this.employeeList.filter((employee) => {
    //       if (parseInt(moment(employee.hireDate).format("M")) === data) {
    //         console.log("入社年" + employee.hireDate);
    //         return employee;
    //       }
    //     });
    //   }
    // },

    // 'getFilter.depName':function(){
    //   console.log('呼ばれました')
    //   //部署名での検索
    //   if (this.$store.state.filter.depName !== "") {
    //     console.log('部署'+this.$store.state.filter.depName)
    //     this.childEmployeeList = this.employeeList.filter((employee) => {
    //       if(employee.dep === this.$store.state.filter.depName){
    //         return employee
    //       }
    //       // console.log("部署ごと" + employee);
    //     });
    //   }

    // },

    // 'getFilter.hireYear':function(){
    //   //入社した年での検索

    //   if (this.$store.state.filter.hireYear !== "") {
    //     console.log('入社年'+this.$store.state.filter.hireYear)
    //     this.childEmployeeList = this.employeeList.filter((employee) => {
    //       if(moment(employee.hireDate).format("YYYY") ===
    //         this.$store.state.filter.hireYear){
    //           return employee
    //         }

    //     });
    //   }

    // },

    // 'getFilter.hireMonth':function(){
    //   //入社した月での検索

    //   if (this.$store.state.filter.hireMonth !== "") {
    //     console.log('入社月'+this.$store.state.filter.hireMonth)
    //     this.childEmployeeList = this.employeeList.filter((employee) => {
    //       if(parseInt(moment(employee.hireDate).format("M")) ===
    //         this.$store.state.filter.hireMonth){
    //           return employee
    //         }

    //     });
    //   }

    // }

    getFilter: {
      handler: function() {
        this.childEmployeeList = this.employeeList

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
          console.log("入社年" + this.$store.state.filter.hireYear)
          console.log("childEmployeeList"+this.childEmployeeList)
          this.childEmployeeList = this.childEmployeeList.filter((employee) => {
            console.log("employeeHiredata"+employee.hireDate)
            if (employee.hireDate.substr(0,4) === this.$store.state.filter.hireYear
            ) {
              console.log("入社年はこれ" + employee.hireDate.substr(0,4));
              
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
              console.log("入社月は" + parseInt(moment(employee.hireDate).format("M")));
              console.log("入社月はこちら"+employee.hireDate)
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
  },
};
</script>
