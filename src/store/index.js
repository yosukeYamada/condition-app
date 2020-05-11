import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: {
        authority: 2, // 初期値は1(一般ユーザー権限)で指定
        dailyPost: {},
        dep: {},
        depId: 0,
        hireDate: "",
        registerDate: "",
        registerUserId: 0,
        status: 0,
        updateDate: "",
        updateUserId: 0,
        userId: 0,
        userName: "",
        userNameKana: "",
        version: 0,
        mailList: [{
          mailId: 0,
          mailName: "",
          registerDate: "",
          registerUserId: 0,
          status: 0,
          updateDate: "",
          updateUserId: 0,
          version: 0
        }],
      },
      depList: [],
      aggregates: [],
      firebaseUser: null,
      employeeList:[],
      loginStatus: false
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
    },
    setFirebaseUser(state, user) {
      state.firebaseUser = user;
    },
    deleteLoginUser(state) {
      state.loginUser = null;
    },
    setAggregate: function(state, aggregate) {
      state.aggregates = aggregate;
    },
    setAuthority(state, authority) {
      state.loginUser.authority = authority;
    },
    employeeList(state, employeeList) {
      state.employeeList = employeeList
    },
    loginStatus(state) {
      state.loginStatus = true;
    },
    changeLoginStatus(state) {
      state.loginStatus = false;
    },
  
  },
  actions: {
    login() {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(googleAuthProvider);
      
    },
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    setFirebaseUser({ commit }, user) {
      commit("setFirebaseUser", user);
    },
    logout() {
      firebase.auth().signOut();
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    setAuthority({ commit }, authority) {
      commit("setAuthority", authority);
    },
    employeeList({commit}, employeeList) {
      commit("employeeList", employeeList)
    },
    loginStatus({commit},) {
      commit("loginStatus")
    },
    changeLoginStatus({commit}) {
      commit("changeLoginStatus")
    },
    getAggregate: function({ commit }) {
      axios
        .get("http://localhost:8080/getAggregateByDay?date=2020/04/27")
        .then((response) => {
          commit("setAggregate", response.data);
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
  modules: {},
  getters: {
    userName: (state) => (state.loginUser ? state.loginUser.userName : ""),
    photoURL: (state) => state.firebaseUser ? state.firebaseUser.photoURL : "",
    employeeMotivation: state => userId => {
      state.employeeList.filter(elm => elm.userId === userId)
    },
    getStatus: function(state){
      return state.loginUser.status
    }
  },
});