<template>
  <div v-if="$store.state.login_user">
    <div class="py-4 border-top">
      <b-avatar
        v-if="photoURL"
        :src="photoURL"
        variant="light"
        size="lg"
      ></b-avatar>
      <span class="ml-3"> {{ userName }} さん </span>
    </div>
    <div>
      <b-button variant="outline-light" @click="logout">ログアウト</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import firebase from "firebase/app";
export default {
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push("/");
      this.change_login_status();
    },
  },
  computed: {
    ...mapGetters(["userName", "photoURL"]),
    ...mapActions(["change_login_status"])
  },
};
</script>