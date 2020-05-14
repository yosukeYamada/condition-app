import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const initialState = {
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
    mailList: [
      {
        mailId: 0,
        mailName: "",
        registerDate: "",
        registerUserId: 0,
        status: 0,
        updateDate: "",
        updateUserId: 0,
        version: 0,
      },
    ],
  },
  depList: [],
  firebaseUser: null,
  employeeList: [],
  loginStatus: false,


  filterQuery:{},

  newsPost:{},

};

export default new Vuex.Store({
  state: initialState,
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
    setAuthority(state, authority) {
      state.loginUser.authority = authority;
    },
    employeeList(state, employeeList) {
      state.employeeList = employeeList;
    },
    loginStatus(state) {
      state.loginStatus = true;
    },
    changeLoginStatus(state) {
      state.loginStatus = false;
    },
    setDairyPost(state, dailyPost) {
      state.loginUser.dailyPost = dailyPost;
    },
    depList(state, depList) {
      state.depList = depList;
    },

    setFilterQuery(state,filterQuery){
      state.filterQuery = filterQuery
    },
    setData(state,data){
      state.employeeList = data
    },

    setNewsPost(state,newsPost){
      state.newsPost = newsPost;
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
    employeeList({ commit }, employeeList) {
      commit("employeeList", employeeList);
    },
    loginStatus({ commit }) {
      commit("loginStatus");
    },
    depList({ commit }, depList) {
      commit("depList", depList);
    },
    changeLoginStatus({ commit }) {
      commit("changeLoginStatus");
    },
    setDairyPost({ commit }, dailyPost) {
      commit("setDairyPost", dailyPost);
    },

    setFilterQuery({commit},filterQuery){
      commit("setFilterQuery",filterQuery)
    },
    setData({commit},data){
      commit("setData",data)
    }
  },
  modules: {
    

    setNewsPost({ commit }, newsPost) {
      commit("setNewsPost", newsPost);
    },

  },
  getters: {
    userName: (state) => (state.loginUser ? state.loginUser.userName : ""),
    photoURL: (state) =>
      state.firebaseUser ? state.firebaseUser.photoURL : "",
    employeeMotivation: (state) => (userId) => {
      state.employeeList.filter((elm) => elm.userId === userId);
    },
    getStatus: function(state) {
      return state.loginStatus;
    },

    //従業員リストを部署名と入社年月で絞り込む
    filterEmployeeList:function(state){
      let data  = state.employeeList;
     
      //部署名で検索
      if(state.filterQuery !== ""){
        data = data.filter(
          (employeeList) => employeeList.dep.depName === state.filterQuery
        );
      }
      return data
    }
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })], // オプションを追加
});
