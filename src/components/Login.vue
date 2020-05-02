<template>
  <div>
    <div v-show="this.$store.state.loading" class="loading">Loading...</div>

    <div v-show="!this.$store.state.loading">
      <div id="content">
        <v-container text-cener>
        <p class="err">{{err}}</p>
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
      name: "Login",
      err: ''
    };
  },
  methods: {
    ...mapActions([
      "login",
      "setLoginUser",
      "setFirebaseUser",
      "deleteLoginUser",
      "setLoading",
      "setLoadings"
    ])
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.setLoading();
      if (user) {
        this.setFirebaseUser(user)
        axios
          .post("http://localhost:8080/mail/findByMailAndAuthority", {
            mail: firebase.auth().currentUser.email
          })
          .then(response => {
            if (response.data.user.authority == 0) {
              this.$router.push("/RegisterUser");
            } else if (response.data.user.authority == 1) {
              this.setLoginUser(response.data);
              //authorityの値をstateに格納
              this.$store.dispatch("setAuthority",response.data.user.authority);

              this.$router.push("/Home");
            } else if (response.data.user.authority == 2) {
              this.setLoginUser(response.data);
              this.$router.push("/Home");

            } else if (response.data.user.authority == 3) {
              this.deleteLoginUser();
              firebase.auth().signOut();
              this.err = 'メールアドレスは@rakus-partners.co.jpのものをお使いください'
            }
          });
        this.setLoadings();
      } else {
        firebase.auth().signOut();
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

.err {
  color: red;
}
</style>