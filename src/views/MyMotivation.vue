<template>
 <b-col>
    <h2 class="mb-4">モチベーション履歴</h2>
      <Motivations />
 </b-col>
</template>

<script>
import Motivations from "../components/Motivations.vue";
import axios from "axios";
import firebase from "firebase/app";
import { mapActions } from "vuex";



export default {
  components: {
    Motivations,
    
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
   //これがないとfirabaseのユーザー情報をstateに格納できない
  methods:{
    ...mapActions([
      "setFirebaseUser"
    ])
  }
};
</script>