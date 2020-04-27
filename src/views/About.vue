<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-text-field name="aaa" v-model="testMessage"/>

    <Login/>
  </div>
</template>
<script>
import Login from '@/components/Login.vue'
export default {
  name:"About",
  data(){
    return{
      testMessage:""
    }
  },
  components : {
    Login
  }
}
</script>
