<template>
  <b-col>
    <h2 class="mb-4">従業員一覧</h2>
    <EmployeeListHeader class="mb-5" />
    <EmployeeList :employee-list="employeeList" />
  </b-col>
</template>

<script>
import moment from "moment";
import EmployeeListHeader from "@/components/employee-list/EmployeeListHeader.vue";
import EmployeeList from "../components/employee-list/EmployeeList.vue";
import axios from "axios";
import firebase from "firebase/app";
import { mapActions } from "vuex";

export default {
  // beforeRouteLeave(to, from, next) {
  //   if (this.$store.getters.getStatus){
  //     next();
  //   } else {
  //     next("/");
  //   }
  // },

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
      this.masterList = this.$store.state.employeeList;
    },

    //これがないとfirabaseのユーザー情報をstateに格納できない
    ...mapActions([
      "setFirebaseUser",
      "login_status",
      "setLoginUser",
    ]),
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
  //リロード時にログインユーザー情報を保持する
  init() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  created() {
    this.getMasterList();
    // firebase.auth().setPersistance(firebase.auth.Auth.Persistance.SESSION);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setFirebaseUser(user);
        axios
          .post("/api/user/findByMailAndAuthority", {
            mail: firebase.auth().currentUser.email,
          })
          .then((response) => {
            //authorityの値をstateに格納
            this.$store.dispatch("setAuthority", response.data.authority);
            this.$store.dispatch("setLoginUser", response.data);
            this.setLoginUser(response.data);
            this.login_status();
           
          });
      }
    });
  },
};
</script>
