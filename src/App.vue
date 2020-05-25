<template>
  <v-app style="background-color:#f5f5f5">
    <Header />
    <router-view />
    <SideMenu></SideMenu>
  </v-app>
</template>

<script>
import Header from "@/components/common/Header";
import SideMenu from "@/components/common/SideMenu";
import firebase from "firebase";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    SideMenu,
  },
  mounted() {
    // axios.get('test/insert')
    this.loginCheck();
  },
  methods: {
    ...mapActions(["setLoginUser"]),
    loginCheck() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          /** ログインしている場合 */
          if (this.$store.state.loginUser === null) {
            axios
              .post("/loginCheck", {
                mail: firebase.auth().currentUser.email,
              })
              .then((response) => {
                this.setLoginUser(response.data);
              });
          }
        }
      });
    },
  },
};
</script>
