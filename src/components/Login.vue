<template>
  <v-flex xs12 mt-5>
    <v-toolbar-items v-if="$store.state.login_user">
      <v-btn color='info' @click="logout">Googleログアウト</v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-else>
      <v-btn color='info' @click="login">Googleログイン</v-btn>
    </v-toolbar-items>

  </v-flex>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['login', 'logout', 'setLoginUser', 'deleteLoginUser'])
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user)
      } else {
        this.deleteLoginUser()
      }
    })
  },
}
</script>