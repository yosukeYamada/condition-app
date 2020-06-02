import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from "axios";
import VueAxios from "vue-axios";
import "../validate/validate.js";
import Push from "push.js";


// var URL = process.env.VUE_APP_API_BASE_URL;
// axios.create({
//   baseURL: URL,
//   headers: {
//     "Access-Control-Expose-Headers": "Authorization",
//     "Content-Type": "application/json",
//     "X-Requested-With": "XMLHttpRequest",
//     "Authorization": store.state.token,
//   },
//   responseType: "json",
// });
// var token = store.state.token
// store.state.watch(token,()=>{
//   token = store.state.token
// })
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.headers.common["Access-Control-Expose-Headers"] = "Authorization";
axios.defaults.headers.common["Authorization"] = store.state.token
// token
// console.log(axios.defaults.baseURL)

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

// ElementUI
import ElementUI from "element-ui";

// ElementUIでの言語設定、datePickerとかで適用される
import locale from "element-ui/lib/locale/lang/ja";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI, { locale });

// デプロイ環境
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

// テストデプロイ環境
// var firebaseConfig = {
//   apiKey: "AIzaSyBiAA6cBRIMrBGSENhV44zAVP2UtNMYbMQ",
//   authDomain: "condition-test-45186.firebaseapp.com",
//   databaseURL: "https://condition-test-45186.firebaseio.com",
//   projectId: "condition-test-45186",
//   storageBucket: "condition-test-45186.appspot.com",
//   messagingSenderId: "994736908511",
//   appId: "1:994736908511:web:af821371ae3b6e7cd2a16a",
//   measurementId: "G-VCW17N3F86"
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  axios,
  Push,
  render: (h) => h(App),
}).$mount("#app");
