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
    user: [],
    dailyPostList: [],
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
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
    setUser(state, user) {
      state.user = user;
    },
    getUserMotivations(state, getUserMotivations) {
      state.dailyPostList = getUserMotivations;
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
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    getUserMotivations: function ({ commit }) {
      axios
        .post("http://localhost:8080/motivations", { userId: this.user })
        .then((response) => {
          console.log(response.data);
          commit("getUserMotivations", response.data);
        });
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
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
    photoURL: (state) => (state.login_user ? state.login_user.photoURL : ""),
  },
});
