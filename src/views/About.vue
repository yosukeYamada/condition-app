<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-text-field name="aaa" v-model="testMessage"/>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name:"About",
  data(){
    return{
      testMessage:"",
      responseMessage:null
    }
  },
  method:{
    testApi(){
      axios.post("https://condition.herokuapp.com/test",{testMessage:this.testMessage}).then(response=>{
        this.responseMessage=response.data
      })
    }
  }
}
</script>
