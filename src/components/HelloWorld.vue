<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="testMessage"/>
        <p>{{testMessage}}</p>
      </v-col>
      <v-btn @click="getTestMessage()">
        <span>テスト送信</span>
      </v-btn>
      <p>{{returnMessage}}</p>
      <p>{{returnMessage}}</p>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",

  data: () => ({
    testMessage:"",
    returnMessage:null

  }),
  created(){
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
  },
  methods:{
    getTestMessage(){
      axios.post("/test",{
        testMessage:this.testMessage
      }).then(response=>{
        this.returnMessage=response.data
      })
    }
  }
};
</script>

// https://condition.herokuapp.com/test