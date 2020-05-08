<template>
  <b-col>
    <DailyAggregate />
    <GraphDescription />
    <MonthlyAggregate />
  </b-col>
</template>

<script>
import MonthlyAggregate from "@/components/aggregate/MonthlyAggregate";
import DailyAggregate from "@/components/aggregate/DailyAggregate.vue";
import GraphDescription from "@/components/aggregate/GraphDescription.vue";
import axios from "axios";
import firebase from "firebase/app";
import { mapActions } from "vuex";


export default {
  components: {
    DailyAggregate,
    MonthlyAggregate,
    GraphDescription,
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
          .post("http://localhost:8080/mail/findByMailAndAuthority", {
            mail: firebase.auth().currentUser.email,
          })
          .then((response) => {
            //authorityの値をstateに格納
            this.$store.dispatch("setAuthority", response.data.user.authority);
            console.log(response.data);

            this.$store.dispatch("setLoginUser", response.data);
          });
      }
    });
  },
  //これがないとfirabaseのユーザー情報をstateに格納できない
  methods:{
    ...mapActions([
      "setFirebaseUser"
    ])
  }
};
</script>
