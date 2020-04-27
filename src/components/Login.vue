<template>
   <v-container text-cener>


 <h1>ログイン画面</h1>
 <p>Applicationをご利用の方は、Googleアカウントでログインしてください</p>

 <router-link to="/registerUser"><v-btn color="info">>Googleアカウントでログイン</v-btn></router-link>
   </v-container>
</template>


<script>
    export default{
        data(){
            return{
                name: "Login"
            }
        }
    }

</script>