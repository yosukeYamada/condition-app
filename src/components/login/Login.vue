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
import Loading from "@/components/login/Loading.vue";

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
      "depList",
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
        axios
          .post("/api/user/findByMailAndAuthority", {
            mail: firebase.auth().currentUser.email
          })
          .then(response => {
            // axios.get("/test/insert")
            //新規登録画面へ遷移
            if (response.data.authority == 0) {
              this.setLoginUser(response.data);
              this.depList(response.data.depList);
              this.$router.push("/registerUser");
              //管理者権限
            } else if (response.data.authority == 1) {
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
            } else if (response.data.authority == 2) {
              this.setLoginUser(response.data);
              this.depList(response.data.depList);
              this.loginStatus();
              //authorityの値をstateに格納
              this.$store.dispatch("setAuthority", response.data.authority);
              this.$router.push("/home");
              //メールアドレスが不正の場合
            } else if (response.data.authority == 3) {
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
