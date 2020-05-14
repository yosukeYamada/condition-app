import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

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
  filterDepName: "",
  newsPost: [],
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

    setFilterDepName(state, filterDepName) {
      state.filterDepName = filterDepName;
    },
    setData(state, data) {
      state.employeeList = data;
    },

    setNewsPost(state, newsPost) {
      state.newsPost = newsPost;
    },
    addNewDep(state, newDep) {
      state.depList.push(newDep);
    },
    changeDepName(state, newDepName) {
      state.depList.map((dep) => {
        if (dep.depId === newDepName.depId) {
          dep.depName = newDepName.depName;
          dep.updateUserId = newDepName.updateUserId;
          dep.updateDate = newDepName.updateDate;
          dep.version = newDepName.version;
        }
      });
    },
    deleteDep(state, depId) {
      state.depList = state.depList.filter((dep) => dep.depId !== depId);
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

    setFilterDepName({ commit }, filterDepName) {
      commit("setFilterDepName", filterDepName);
    },
    setNewsPost({ commit }, newsPost) {
      commit("setNewsPost", newsPost);
    },
    setData({ commit }, data) {
      commit("setData", data);
    },
    addNewDep({ commit }, newDepData) {
      axios
        .post("/editDeps/addNewDep", newDepData)
        .then((response) => {
          alert("部署の新規追加が完了しました！");
          commit("addNewDep", response.data);
        })
        .catch((error) => {
          alert("部署の新規追加に失敗しました！");
          console.error(error);
        });
    },
    changeDepName({ commit }, newDepName) {
      axios
        .post("/editDeps/changeDepName", newDepName)
        .then((response) => {
          alert("部署名の変更が完了しました！");
          commit("changeDepName", response.data);
        })
        .catch((error) => {
          alert("部署名の変更に失敗しました！");
          console.error(error);
        });
    },
    deleteDep({ commit }, deletedDep) {
      axios
        .post("/editDeps/deleteDep", {
          depId: deletedDep.depId,
          updateUserId: deletedDep.updateUserId,
        })
        .then(() => {
          alert(deletedDep.depName + "の削除に成功しました");
          commit("deleteDep", deletedDep.depId);
        })
        .catch((error) => {
          console.error(error);
          alert("登録されている部署の削除に失敗しました。");
        });
    },
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
    filterDepName: function(state) {
      let data = state.employeeList;

      //部署名で検索
      if (state.filterDepName !== "") {
        data = data.filter((employeeList) => employeeList.dep.depName);
      }
      return data;
    },
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })], // オプションを追加
});
