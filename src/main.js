import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import firebase from 'firebase'
Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCkTAVQThEpr3S4e_cMkP4xbTSvfDD6rVo",
  authDomain: "condition-meter.firebaseapp.com",
  databaseURL: "https://condition-meter.firebaseio.com",
  projectId: "condition-meter",
  storageBucket: "condition-meter.appspot.com",
  messagingSenderId: "118802890827",
  appId: "1:118802890827:web:c72a45c4a062379f0b0dce",
  measurementId: "G-36VS9SHCWR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
