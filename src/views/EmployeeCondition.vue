<template>
  <div>
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
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";
import axios from "axios";
import firebase from "firebase/app";
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
  methods: {
    //これがないとfirabaseのユーザー情報をstateに格納できない
    ...mapActions(["setFirebaseUser"]),
  },
  //リロード時にログインユーザー情報を保持する
  init() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setFirebaseUser(user);
        axios
          .post("/api/user/findByMailAndAuthority", {
            mail: firebase.auth().currentUser.email,
          })
          .then((response) => {
            //authorityの値をstateに格納
            this.$store.dispatch("setAuthority", response.data.user.authority);
            this.$store.dispatch("setLoginUser", response.data);
          });
      }
    });
  },
};
</script>
