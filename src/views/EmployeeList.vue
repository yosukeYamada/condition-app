<template>
  <b-col>
    <h2 class="mb-4">従業員一覧</h2>
      <EmployeeListHeader class="mb-5" />
      <EmployeeList :employee-list="employeeList" />
  </b-col>
</template>

<script>
import EmployeeListHeader from "@/components/employee-list/EmployeeListHeader.vue";
import EmployeeList from "../components/employee-list/EmployeeList.vue";
import axios from "axios";
import firebase from "firebase/app";
import { mapActions } from "vuex";


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
      this.masterList = this.$store.state.employeeList
    },

    //これがないとfirabaseのユーザー情報をstateに格納できない
     ...mapActions([
      "setFirebaseUser"
    ])
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
          .post("/mail/findByMailAndAuthority", {
            mail: firebase.auth().currentUser.email,
          })
          .then((response) => {
            //authorityの値をstateに格納
            this.$store.dispatch("setAuthority", response.data.authority);
            this.$store.dispatch("setLoginUser", response.data);
          });
      }
    });
  },
  
};
</script>
