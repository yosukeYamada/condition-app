<template>
  <div>
    <div v-show="loading" class="loading">Loading...</div>
    <b-card
      class="text-center py-3 shadow-sm"
      v-show="!loading"
    >
      <b-card-text>
        <p class="err">{{ err }}</p>
        <p class="display-2 font-weight-bold text-success mb-5">Rakuppo</p>
        <p>あなたの今日のコンディションを記録しましょう</p>
        <span v-if="!$store.state.login_user">
          <v-btn
            class="my-5 px-5 align-middle"
            outlined
            color="grey lighten-1"
            @click="login"
            style="text-transform: none;height:42px"
          >
            <div class="px-3">
              <img class="pb-1" src="@/assets/google_icon.png" />
              <span class="ml-1" style="color:#6a6a6a">
                Googleアカウントでログイン
              </span>
            </div>
          </v-btn>
        </span>
      </b-card-text>
    </b-card>
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
      err: "",
      loading: true
    };
  },
  methods: {
    ...mapActions([
      "login",
      "setLoginUser",
      "setFirebaseUser",
      "deleteLoginUser",
      "setLoading",
      "setLoadings",
      "employeeList",
    ]),
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.loading = false;
      if (user) {
        this.setFirebaseUser(user);
        axios
          .post("/mail/findByMailAndAuthority", {
            mail: firebase.auth().currentUser.email,
          })
          .then((response) => {
            //新規登録画面へ遷移
            if (response.data.user.authority == 0) {
              this.setLoginUser(response.data);
              this.$router.push("/RegisterUser");
            //管理者権限
            } else if (response.data.user.authority == 1) {
              this.setLoginUser(response.data);
              //authorityの値をstateに格納
              this.$store.dispatch(
                "setAuthority",
                response.data.user.authority
              );
              //全従業員情報を取得
              axios.get("/showEmployeeList")
              .then((response) => {
                this.employeeList(response.data);
              })
              .catch((e) => {
                alert("従業員一覧を取得するAPIとの通信に失敗しました:" + e);
              });
              this.$router.push("/Home");
            //従業員権限
            } else if (response.data.user.authority == 2) {
              this.setLoginUser(response.data);
              //authorityの値をstateに格納
              this.$store.dispatch(
                "setAuthority",
                response.data.user.authority);
              this.$router.push("/Home");
            } else if (response.data.user.authority == 3) {
              this.deleteLoginUser();
              firebase.auth().signOut();
              this.err =
                "メールアドレスは@rakus-partners.co.jpのものをお使いください";
            }
          });
        this.loading = true
      } else {
        firebase.auth().signOut();
        this.deleteLoginUser();
      }
    });
  },
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
