import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: {
      mailId: 0,
      mailName: "",
      registerDate: "",
      registerUserId: 0,
      status: 0,
      updateDate: "",
      updateUserId: 0,
      user: {
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
      },
      userId: 0,
      version: 0,
    },
    aggregates: [],
    firebase_user: null,
    employeeList: [],
    login_status: false,
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    setFirebaseUser(state, user) {
      state.firebase_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    setAggregate: function(state, aggregate) {
      state.aggregates = aggregate;
    },
    setAuthority(state, authority) {
      state.login_user.user.authority = authority;
    },
    employeeList(state, employeeList) {
      state.employeeList = employeeList;
    },
    login_status(state) {
      state.login_status = true;
    },
    change_login_status(state) {
      state.login_status = false;
    },
    setDairyPost(state, dailyPost) {
      state.login_status = dailyPost;
    },
  },
  actions: {
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
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
    employeeList({ commit }, employeeList) {
      commit("employeeList", employeeList);
    },
    login_status({ commit }) {
      commit("login_status");
    },
    change_login_status({ commit }) {
      commit("change_login_status");
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
    setDairyPosts({ commit, dailyPost }) {
      commit("setDairyPosts", dailyPost);
    },
  },
  modules: {},
  getters: {
    userName: (state) =>
      state.login_user ? state.login_user.user.userName : "",
    photoURL: (state) =>
      state.firebase_user ? state.firebase_user.photoURL : "",
    employeeMotivation: (state) => (userId) => {
      state.employeeList.filter((elm) => elm.userId === userId);
    },
    getStatus: function(state) {
      return state.login_user.user.status;
    },
  },
});
