<template>
  <b-col>
    <h2 class="mb-4">管理者設定</h2>
    <b-row>
      <b-col sm="6">
        <AdminSetting />
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6">
        <Setting2 />
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import AdminSetting from "@/components/admin-setting/AdminSetting";
import Setting2 from "@/components/admin-setting/Setting2";
import axios from "axios";
import firebase from "firebase/app";

export default {
  components: {
    AdminSetting,
    Setting2
  },

  //リロード時にログインユーザー情報を保持する
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
