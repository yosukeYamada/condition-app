<template>
  <div>
    <DailyPostForm />
  </div>
</template>

<script>
import DailyPostForm from "@/components/daily-post/DailyPostForm.vue";
import axios from "axios";
import firebase from "firebase/app";
import { mapActions } from "vuex";

export default {
  components: {
    DailyPostForm,
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
          .post("/mail/findByMailAndAuthority", {
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
  //これがないとfirabaseのユーザー情報をstateに格納できない
  methods:{
    ...mapActions([
      "setFirebaseUser"
    ])
  }

};
</script>
