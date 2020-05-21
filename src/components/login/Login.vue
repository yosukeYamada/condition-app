<template>
  <div>
    <b-card class="text-center py-3 shadow-sm" v-show="!loading">
      <b-card-text>
        <p class="err" style="white-space:pre-wrap; word-wrap:break-word;">{{ err }}</p>
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
          <v-btn text color="green" @click="toPage('/top')">トップに戻る</v-btn>
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
  methods: {
    ...mapActions([
      "login",
      "setLoginUser",
      "setFirebaseUser",
      "deleteLoginUser",
      "setLoading",
      "setLoadings",
      "employeeList",
      "loginStatus",
      "depList"
    ]),
    toPage(path) {
      this.$router.push(path);
    }
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.loading = false;
      // const token = firebase.auth().currentUser.getIdToken(true);
      // console.log(token);
      if (user) {
        this.setFirebaseUser(user);
        var googleMailAddress = firebase.auth().currentUser.email
        axios
          .post("/loginCheck", {
            mail: googleMailAddress
          })
          .then(response => {
            //新規登録画面へ遷移
            if (response.data.authority == AUTHORITY.UNREGISTERED) {
              console.log("未登録者")
              firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(idToken => {
                  axios
                    .post("/signUp", {
                      mailAddress: googleMailAddress,
                      password: idToken
                    })
                    .then(() => {
                      axios.post("/login",{mailAddress:googleMailAddress,pasword:idToken}).then(response=>{
                        console.log(response)
                        console.log(response.data)
                      })
                      this.setLoginUser(response.data);
                      this.depList(response.data.depList);
                      this.$router.push("/registerUser");
                    }).catch(error=>{
                      console.log(error)
                      console.log("ログインに失敗しました。")
                    })
                }).catch(error=>{
                  console.log(error)
                  console.log("ＡＰＩユーザ登録に失敗しました")
                })
                

              //管理者権限
            } else if (response.data.authority == AUTHORITY.ADMIN) {
              this.setLoginUser(response.data);
              this.depList(response.data.depList);
              this.loginStatus();
              //authorityの値をstateに格納
              this.$store.dispatch("setAuthority", response.data.authority);
              //全従業員情報を取得
              axios
                .get("/showEmployeeList")
                .then(response => {
                  this.employeeList(response.data);
                })
                .catch(e => {
                  alert("従業員一覧を取得するAPIとの通信に失敗しました:" + e);
                });
              this.$router.push("/home");
              //従業員権限
            } else if (response.data.authority == AUTHORITY.USER) {
              this.setLoginUser(response.data);
              this.depList(response.data.depList);
              this.loginStatus();
              //authorityの値をstateに格納
              this.$store.dispatch("setAuthority", response.data.authority);
              this.$router.push("/home");
              //メールアドレスが不正の場合
            } else if (response.data.authority == AUTHORITY.OUTSIDER) {
              this.deleteLoginUser();
              firebase.auth().signOut();
              this.err = `メールアドレスは@rakus-partners.co.jp、
または@rakus.co.jpのものをお使いください`;
            }
            // お知らせ一覧を取得、表示用にstateに格納
            this.$store.dispatch("setNewsPost", response.data.postedNewsList);
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

<style>
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}

.err {
  color: red;
}
</style>
