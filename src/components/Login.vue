<template>
   <v-container text-cener>
 <h1>ログイン画面</h1>
 <p>Applicationをご利用の方は、Googleアカウントでログインしてください</p>

 <router-link to="/registerUser"><v-btn color="info" @click="login">Googleアカウントでログイン</v-btn></router-link>
   </v-container>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
    export default{
        data(){
            return{
                name: "Login"
            }
        },
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