<template>
  <div>
    <v-alert v-if="err !== ''" outlined type="error" style="white-space:pre-wrap;" text>{{ err }}</v-alert>
    <b-card class="text-center py-3 shadow-sm" v-show="!loading">
      <b-card-text>
        <p class="display-2 font-weight-bold text-success mb-5">Rakuppo</p>
        <p>あなたの今日のコンディションを記録しましょう</p>
        <v-btn
          class="my-5 px-5 align-middle"
          outlined
          color="grey lighten-1"
          @click="login"
          style="text-transform: none;height:42px"
        >
          <div class="px-3">
            <img class="pb-1" src="@/assets/img/google_icon.png" />
            <span class="ml-1" style="color:#6a6a6a">Googleアカウントでログイン</span>
          </div>
        </v-btn>
        <div>
          <v-btn text color="green" @click="toPage('/')">トップに戻る</v-btn>
        </div>
      </b-card-text>
    </b-card>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase/app";
import { mapActions } from "vuex";
import Loading from "@/components/common/Loading.vue";
import AUTHORITY from "@/assets/js/Authority.js";

export default {
  data() {
    return {
      name: "Login",
      err: "",
      loading: true
    };
  },
  components: {
    Loading
  },
  computed:{
    token() {
      return this.$store.state.token
    }
  },
  methods: {
    ...mapActions([
      "login",
      "setLoginUser",
      "setFirebaseUser",
      "deleteLoginUser",
      "switchLoginStatus",
      "getEmployeeList",
      "getDepList",
      "setToken"
    ]),
    toPage(path) {
      this.$router.push(path);
    }
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.loading = false;
      if (user) {
        this.setFirebaseUser(user);
        var googleMailAddress = firebase.auth().currentUser.email;
        axios
          .post("/loginCheck", {
            mail: googleMailAddress
          })
          .then(response => {
            this.setLoginUser(response.data);
            this.getDepList(response.data.depList);
            //新規登録画面へ遷移
            if (response.data.authority == AUTHORITY.UNREGISTERED) {
              axios
                .post("/signUp", {
                  mailAddress: googleMailAddress,
                  password: googleMailAddress
                })
                .then(() => {
                  // APIへログイン
                  axios
                    .post("/login", {
                      mailAddress: googleMailAddress,
                      password: googleMailAddress
                    })
                    .then(apiLoginResponse => {
                      this.setToken(apiLoginResponse.headers["authorization"]);
                      this.$router.push("/registerUser");
                    })
                    .catch(error => {
                      console.log(error);
                    });
                })
                .catch(error => {
                  console.log(error);
                });
              //管理者権限
            } else if (response.data.authority == AUTHORITY.ADMIN) {
              /** 管理者権限の場合 */
              /** APIへログイン */
              axios
                .post("/login", {
                  mailAddress: googleMailAddress,
                  password: googleMailAddress
                })
                .then(apiLoginResponse => {
                  this.setLoginUser(response.data);
                  this.getDepList();
                  this.switchLoginStatus(true);
                  Promise.resolve()
                    .then(() =>
                      this.setToken(apiLoginResponse.headers["authorization"])
                    )
                    .then(() => axios.defaults.headers.common["Authorization"] = this.token)
                    .then(() => this.getEmployeeList())
                    .then(() => this.$router.push("/home"));
                  //全従業員情報を取得
                })
                .catch(error => {
                  console.log(error);
                });
            } else if (response.data.authority == AUTHORITY.USER) {
              /** ユーザー権限の場合 */
              axios
                .post("/login", {
                  mailAddress: googleMailAddress,
                  password: googleMailAddress
                })
                .then(apiLoginResponse => {
                  this.setToken(apiLoginResponse.headers["authorization"]);
                  this.setLoginUser(response.data);
                  this.getDepList();
                  this.switchLoginStatus(true);
                  this.$router.push("/home");
                })
                .catch(error => {
                  console.log(error);
                });
            } else if (response.data.authority == AUTHORITY.OUTSIDER) {
              /** メールアドレスのドメインが組織外のユーザーの場合 */
              this.deleteLoginUser();
              firebase.auth().signOut();
              this.err =
                "メールドメインがrakus-partners.co.jp\nまたはrakus.co.jpのユーザーのみログインできます";
            }
          })
          .catch(error => {
            console.log(error);
            console.log("失敗");
          });
        this.loading = true;
      } else {
        firebase.auth().signOut();
        this.deleteLoginUser();
      }
    });
  }
};
</script>
