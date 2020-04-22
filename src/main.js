import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import firebase from 'firebase'
Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCkTAVQThEpr3S4e_cMkP4xbTSvfDD6rVo",
  authDomain: "condition-meter.firebaseapp.com",
  databaseURL: "https://condition-meter.firebaseio.com",
  projectId: "condition-meter",
  storageBucket: "condition-meter.appspot.com",
  messagingSenderId: "118802890827",
  appId: "1:118802890827:web:f06a0a4a0a62886a0b0dce",
  measurementId: "G-K0VL0M6KJN"
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
