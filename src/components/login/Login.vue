<template>
  <div>
    <b-card class="text-center py-3 shadow-sm" v-show="!loading">
      <b-card-text>
        <p class="err" style="white-space:pre-wrap; word-wrap:break-word;">
          {{ err }}
        </p>
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
            <span class="ml-1" style="color:#6a6a6a"
              >Googleアカウントでログイン</span
            >
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
      loading: true,
    };
  },
  components: {
    Loading,
  },
  methods: {
    ...mapActions([
      "login",
      "setLoginUser",
      "setFirebaseUser",
      "deleteLoginUser",
      "setLoading",
      "setLoadings",
      "switchLoginStatus",
      "getEmployeeList",
      "getDepList",
    ]),
    toPage(path) {
      this.$router.push(path);
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.loading = false;
      if (user) {
        this.setFirebaseUser(user);
        axios
          .post("/loginCheck", {
            mail: firebase.auth().currentUser.email,
          })
          .then((response) => {
            if (response.data.authority == AUTHORITY.UNREGISTERED) {
              /** 未登録ユーザーだった場合 */
              this.setLoginUser(response.data);
              this.getDepList();
              this.$router.push("/registerUser");
            } else if (response.data.authority == AUTHORITY.ADMIN) {
              /** 管理者権限の場合 */
              this.setLoginUser(response.data);
              this.getDepList();
              this.switchLoginStatus(true);
              //全従業員情報を取得
              this.getEmployeeList();
              this.$router.push("/home");
            } else if (response.data.authority == AUTHORITY.USER) {
              /** ユーザー権限の場合 */
              this.setLoginUser(response.data);
              this.setDepList(response.data.depList);
              this.switchLoginStatus(true);
              this.$router.push("/home");
            } else if (response.data.authority == AUTHORITY.OUTSIDER) {
              /** メールアドレスのドメインが組織外のユーザーの場合 */
              this.deleteLoginUser();
              firebase.auth().signOut();
              this.err = `メールアドレスは@rakus-partners.co.jp、
または@rakus.co.jpのものをお使いください`;
            }
          });
        this.loading = true;
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
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}

.err {
  color: red;
}
</style>
