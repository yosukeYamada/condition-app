<template>

    <div id="login">
   <v-container text-cener>
 <h1>ログイン画面</h1>
 <p>Applicationをご利用の方は、Googleアカウントでログインしてください</p>

      <span v-if="$store.state.login_user">
        <v-btn color="info" @click="logout">ログアウト</v-btn>
      </span>

      <span v-if="!$store.state.login_user">
        <v-btn color="info" @click="login">ログイン</v-btn>
      </span>
   </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase/app'
import { mapActions } from 'vuex'

    export default{
        data(){
            return{
                name: "Login",
                loading: false
            }
        },
        methods: {
          ...mapActions(['login', 'logout', 'setLoginUser', 'deleteLoginUser'])
        },
        created () {
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              this.setLoginUser(user)
              axios.post('http://localhost:8080/mail/findByMail', {mail: firebase.auth().currentUser.email})
              this.loading = false
            } else {
              this.deleteLoginUser()
            }
          })
        },
    }
</script>