<template>
  <div>
    <div v-show="this.$store.state.loading" class="loading">Loading...</div>

    <div v-show="!this.$store.state.loading">
      <div id="content">
        <v-container text-cener>
          <h1>ログイン画面</h1>
          <p>Applicationをご利用の方は、Googleアカウントでログインしてください</p>

          <span v-if="!$store.state.login_user">
            <v-btn color="info" @click="login">Googleアカウントでログイン</v-btn>
          </span>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase/app";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "Login"
    };
  },
  methods: {
    ...mapActions([
      "login",
      "setLoginUser",
      "deleteLoginUser",
      "setLoading",
      "setLoadings"
    ])
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.setLoading();
      if (user) {
        this.setLoginUser(user);
        axios
          .post("http://localhost:8080/mail/findByMailAndAuthority", {
            mail: firebase.auth().currentUser.email
          })
          .then(response => {
            if (response.data.user.authority == 0) {
              console.log("新規");
              this.$router.push("/RegisterUser");
            } else if (response.data.user.authority == 1) {
              console.log("管理者");
<<<<<<< Updated upstream
              console.log("情報 : " + response.data.user)
=======
              this.$store.dispatch("setUser", response.data.user.userId);
>>>>>>> Stashed changes
              this.$router.push("/AdminHome");
              console.log("情報 : " + response.data.user.userId)
            } else if (response.data.user.authority == 2) {
              console.log("従業員");
              console.log("情報 : " + response.data.user.userId)
              this.$store.dispatch("setUser", response.data.user.userId);
              this.$router.push("/EmployeeHome");
            }
          });
        this.setLoadings();
      } else {
        this.$router.push("/");
        this.deleteLoginUser();
      }
    });
  }
};
</script>

<style>
.loading {
  padding: 0px; /* 余白指定 */
  top: 0; /* 位置指定 */
  bottom: 0; /* 位置指定 */
  left: 0; /* 位置指定 */
  position: absolute;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 110px;
}
</style>