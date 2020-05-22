import Vue from "vue";
import axios from "axios"

var token = this.$store.state.token
const afterLoginAxios = axios.create({
    baseURL: URL,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      'Authorization':'Bearer '+token
    },
    responseType: "json"
  });

  Vue.prototype.$afterLoginAxios = afterLoginAxios