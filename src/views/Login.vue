<template>
  <div>
    <div v-if="!loading">Loading...</div>

    <Login v-if="loading"></Login>

  </div>
</template>

<script>
import firebase from 'firebase/app'
import Login from "../components/Login.vue";
import { mapActions } from 'vuex'

export default {
  data: function() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions(['setLoginUser'])
  },
  components: {
    Login
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user)
        this.loading = true
      }
    })
  },
};
</script>