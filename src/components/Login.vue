<template>
  <div>
    <div v-show="this.$store.state.loading" class="loading">
      Loading...
    </div>
      
    <div v-show="!this.$store.state.loading">
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
    </div>
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
          }
      },
      methods: {
        ...mapActions(['login', 'logout', 'setLoginUser', 'deleteLoginUser', 'setLoading', 'setLoadings'])
      },
      created () {
        firebase.auth().onAuthStateChanged(user => {
        this.setLoading()
          if (user) {
            this.setLoginUser(user)
            axios.post('http://localhost:8080/mail/findByMail', {mail: firebase.auth().currentUser.email})
            this.setLoadings()
          } else {
            this.deleteLoginUser()
          }
        })
      },
  }
</script>

<style>
.loading{
    padding: 0px;               /* 余白指定 */
    top:  0;                     /* 位置指定 */
    bottom:  0;                  /* 位置指定 */
    left:  0;                    /* 位置指定 */
    position: absolute;
    margin:auto;
    text-align: center;
    width:100%;
    height :110px;
}
</style>