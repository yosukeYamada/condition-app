<template>
  <b-col>
    <AdminHome v-if="authority === 1"></AdminHome>
    <EmployeeHome v-if="authority === 2"></EmployeeHome>
  </b-col>
</template>

<script>
import AdminHome from "@/components/home/AdminHome";
import EmployeeHome from "@/components/home/EmployeeHome";
import axios from "axios";
import firebase from "firebase/app";
import { mapActions } from "vuex";
// import store from "../store/index.js";
export default {
  // beforeRouterUpdate(to, from, next) {
  //   if (store.state.login_status) {
  //     next();
  //   } else {
  //     next({path: '/' });
  //   }
  //   },

  components: {
    AdminHome,
    EmployeeHome,
  },

  //リロード時にログインユーザー情報を保持する
  init() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  created() {
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
          });
      }
    });
  },
  computed: {
    authority: function() {
      return this.$store.state.loginUser.authority;
    },
  },

  //これがないとfirabaseのユーザー情報をstateに格納できない
  methods: {
    ...mapActions(["setFirebaseUser"]),
  },
};
</script>
