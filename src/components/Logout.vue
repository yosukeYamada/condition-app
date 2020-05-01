<template>
  <span v-if="$store.state.login_user">
    <v-list-item-content>
    <v-list-item-avatar><img v-if="photoURL" :src="photoURL"></v-list-item-avatar>
      <v-list-item-title>{{ userName }}</v-list-item-title>
    </v-list-item-content>
    <v-btn color="info" @click="logout">ログアウト</v-btn>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from "firebase/app";
export default {
   methods: {
      logout() {
        firebase.auth().signOut();
        this.$router.push("/");
      }
   },
   computed: {
    ...mapGetters(['userName', 'photoURL'])
  }
}
</script>