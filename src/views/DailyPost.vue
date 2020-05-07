<template>
  <div>
    <DailyPostForm />
  </div>
</template>

<script>
import DailyPostForm from "@/components/daily-post/DailyPostForm.vue";
import axios from "axios";
import firebase from "firebase/app";

export default {
  components: {
    DailyPostForm,
  },

  init() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  created() {
    // firebase.auth().setPersistance(firebase.auth.Auth.Persistance.SESSION);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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

};
</script>
