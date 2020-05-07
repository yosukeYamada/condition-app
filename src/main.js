import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from "axios";
import VueAxios from "vue-axios";
import "../validate/validate.js"

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
Vue.use(VueAxios, axios);

// bootstrap-vueのインポート
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

/** FontAwesomeのインポート */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// アイコンを読み込み
library.add(fas, far, fab);
// Vueコンポーネントを作成
Vue.component("v-fa", FontAwesomeIcon);

// firebaseのインポート
import firebase from "firebase";
Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCkTAVQThEpr3S4e_cMkP4xbTSvfDD6rVo",
  authDomain: "condition-meter.firebaseapp.com",
  databaseURL: "https://condition-meter.firebaseio.com",
  projectId: "condition-meter",
  storageBucket: "condition-meter.appspot.com",
  messagingSenderId: "118802890827",
  appId: "1:118802890827:web:c72a45c4a062379f0b0dce",
  measurementId: "G-36VS9SHCWR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount("#app");
