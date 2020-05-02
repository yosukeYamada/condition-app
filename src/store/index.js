import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
    mail: "",
    loading: true,
    aggregates: [],
    dailyPostList: [],
    firebase_user: null,
    authority: "",
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
    setLoading(state) {
      state.loading = false;
    },
    setAggregate: function(state, aggregate) {
      state.aggregates = aggregate;
    },
    setLoadings(state) {
      state.loading = true;
    },
    setAuthority(state, authority) {
      state.authority = authority;
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
    setLoading({ commit }) {
      commit("setLoading");
    },
    setLoadings({ commit }) {
      commit("setLoadings");
    },
    setAuthority({ commit }, authority) {
      commit("setAuthority", authority);
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
    userName: (state) => (state.login_user ? state.login_user.userName : ""),
    photoURL: (state) =>
      state.firebase_user ? state.firebase_user.photoURL : "",
  },
});
