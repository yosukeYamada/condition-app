import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import filter from "./filter";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    loginUser: {
      authority: 2, // 初期値は2(一般ユーザー権限)で指定
      dailyPost: [],
      dep: {}, // 削除する
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
    firebaseUser: null,
    loginStatus: false,
    depList: [],
    employeeList: [],
    newsPostList: [],
    informationList: [],
    categoryList: [],
    filter: {
      userName: "",
      depName: "",
      hireYear: "",
      hireMonth: "",
    },
    filterDepName: "",
    filterHireYear: "",
    filterHireMonth: "",
    //リロードすると消えてしまうNews、従業員詳細
    empDetail: [],
  };
};

var initializeState = getDefaultState();

export default new Vuex.Store({
  state: initializeState,
  mutations: {
    /**
     * ログインしてるユーザーをstateにセットする
     * @param {*} user ユーザー
     */
    setLoginUser(state, user) {
      state.loginUser = user;
    },
    /**
     * firebaseの情報をstateにセットする
     * @param {*} user ユーザー
     */
    setFirebaseUser(state, user) {
      state.firebaseUser = user;
    },
    /**
     * ログインしてるユーザーの情報を削除する
     */
    deleteLoginUser(state) {
      state.loginUser = null;
    },
    /**
     * ログイン状態を切り替えるメソッド
     * @param {*} isLogin ログイン状態
     */
    switchLoginStatus(state, isLogin) {
      state.loginStatus = isLogin;
    },
    setAuthority(state, authority) {
      state.loginUser.authority = authority;
    },
    /**
     * employeeListに取得した従業員一覧をセットするメソッド
     * @param {*} employeeList 従業員一覧
     */
    setEmployeeList(state, employeeList) {
      state.employeeList = employeeList;
    },
    /**
     * depListに取得した部署一覧をセットするメソッド
     * @param {*} depList 部署一覧
     */
    setDepList(state, depList) {
      state.depList = depList;
    },
    setDairyPost(state, dailyPost) {
      state.loginUser.dailyPost = dailyPost;
    },
    /**
     * 検索用の部署名をstateにセットする
     * @param {*} filterDepName 検索時に使用する部署名
     */
    setFilterDepName(state, filterDepName) {
      state.filter.depName = filterDepName;
    },
    /**
     * 検索用の入社年をstateにセットする
     * @param {*} filterHireYear 検索時に使用する入社年
     */
    setFilterHireYear(state, filterHireYear) {
      state.filter.hireYear = filterHireYear;
    },
    /**
     * 検索用の入社月をstateにセットする
     * @param {*} filterHireMonth 検索時に使用する入社月
     */
    setFilterHireMonth(state, filterHireMonth) {
      state.filter.hireMonth = filterHireMonth;
    },
    /**
     * 検索用のユーザー名をstateにセットする
     * @param {*} filterUserName 検索時に使用するユーザー名
     */
    setFilterUserName(state, filterUserName) {
      state.filter.userName = filterUserName;
    },
    /**
     * お知らせ一覧をstateにセットする
     * @param {*} newsPostList お知らせ一覧
     */
    setNewsPostList(state, newsPostList) {
      state.newsPostList = newsPostList;
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
    /**
     * トップページのNewsをstateにセットする
     * @param {*} information 情報
     */
    setInformationList(state, information) {
      state.informationList = information;
    },
    /**
     * トップページのNewsのカテゴリーをstateにセットする
     * @param {*} vategory カテゴリー
     */
    setCategoryList(state, category) {
      state.categoryList = category;
    },
    /**
     * depListに新しいdepを追加するメソッド
     * @param {*} state
     * @param {*} newDep 新しい部署情報
     */
    addNewDep(state, newDep) {
      state.depList.push(newDep);
    },
    /**
     * depListのdepの情報を新しい部署名に更新するメソッド
     * @param {*} state
     * @param {*} newDepName 名前を変更する部署情報
     */
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
    /**
     * depListからdepを削除するメソッド
     * @param {*} state
     * @param {*} depId 部署ID
     */
    deleteDep(state, depId) {
      state.depList = state.depList.filter((dep) => dep.depId !== depId);
    },
    deleteUser(state, userId) {
      state.employeeList = state.employeeList.filter(
        (employee) => employee.userId !== userId
      );
    },

    /**
     * 自分の投稿をstoreのemployeeListのdailyPostに格納する
     * @param {*} myDailyPost 自分の今日の投稿内容
     */
    setMyDailyPost(state, myDailyPost) {
      state.employeeList.filter(
        (employee) => employee.userId === state.loginUser.userId
      )[0].dailyPost = myDailyPost;
    },
    //リロードすると消えてしまうEmp詳細
    setEmpDetail(state, empDetail) {
      state.empDetail = empDetail;
    },
    setEmpDetailId(state, userId) {
      state.empDetail.push({
        userId: userId,
      });
    },
    /**
     * ユーザー権限の更新をemployeeList内のユーザー情報に反映するメソッド
     * @param {*} updatedUser 更新されたユーザー情報
     */
    updateUserAuthority(state, updatedUser) {
      state.employeeList.map((employee) => {
        if (employee.userId === updatedUser.userId) {
          employee.updateUserId = updatedUser.updateUserId;
          employee.updateDate = updatedUser.updateDate;
          employee.version = updatedUser.version;
          employee.authority = updatedUser.authority;
        }
      });
    },
    /**
     * stateの状態をリセットするメソッド
     */
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    /**
     * Google認証ログインを使ってログイン作業をする
     */
    login() {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(googleAuthProvider);
    },
    /**
     * ログイン状態を切り替えるメソッド
     * @components/login/Login.vue
     * @components/common/Logout.vue
     * @param {*} isLogin ログイン状態(true ログインしている / false ログインしていない)
     */
    switchLoginStatus({ commit }, isLogin) {
      commit("switchLoginStatus", isLogin);
    },
    /**
     * ログインしてるユーザーをstateにセットする
     * @param {*} user ユーザー
     */
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    /**
     * firebaseの情報をstateにセットする
     * @param {*} user ユーザー
     */
    setFirebaseUser({ commit }, user) {
      commit("setFirebaseUser", user);
    },
    /**
     * ログインしてるユーザーの情報を削除する
     */
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    setAuthority({ commit }, authority) {
      commit("setAuthority", authority);
    },
    /**
     * 従業員一覧を取得するメソッド
     * @components/login/Login.vue
     */
    getEmployeeList({ commit }) {
      axios
        .get("/showEmployeeList")
        .then((response) => {
          commit("setEmployeeList", response.data);
        })
        .catch((e) => {
          alert("従業員一覧を取得するAPIとの通信に失敗しました:" + e);
        });
    },
    /**
     * 部署一覧を取得するメソッド
     * @components/login/Login.vue
     */
    getDepList({ commit }) {
      axios.get("/getDepList").then((response) => {
        commit("setDepList", response.data);
      });
    },
    setDairyPost({ commit }, dailyPost) {
      commit("setDairyPost", dailyPost);
    },
    setEmployeeList({ commit }, employeeList) {
      commit("setEmployeeList", employeeList);
    },
    /**
     * お知らせ一覧をstateにセットする
     * @param {*} newsPostList お知らせ一覧
     */
    setNewsPostList({ commit }, newsPostList) {
      commit("setNewsPostList", newsPostList);
    },
    /**
     * トップページのNewsをstateにセットする
     * @param {*} information 情報
     */
    setInformationList({ commit }, information) {
      commit("setInformationList", information);
    },
    /**
     * トップページのNewsのカテゴリーをstateにセットする
     * @param {*} category カテゴリー
     */
    setCategoryList({ commit }, category) {
      commit("setCategoryList", category);
    },
    setData({ commit }, data) {
      commit("setData", data);
    },
    /**
     * 部署の新規追加を行うメソッド
     * @components/admin-setting/EditDeps.vueで利用
     * @param {*} newDepData
     */
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
    /**
     * 既存の部署名の変更を行うメソッド
     * @components/admin-setting/EditDeps.vueで利用
     * @param {*} newDepName 名前を変更する部署情報
     */
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
    /**
     * 入社年を使用し、絞り込み検索する
     * @param {*} filterHireYear 検索時に使用する入社年
     */
    setFilterHireYear({ commit }, filterHireYear) {
      commit("setFilterHireYear", filterHireYear);
    },
    /**
     * 部署名を使用し、絞り込み検索する
     * @param {*} filterDepName 検索時に使用する部署名
     */
    setFilterDepName({ commit }, filterDepName) {
      commit("setFilterDepName", filterDepName);
    },
    /**
     * 入社月を使用し、絞り込み検索する
     * @param {*} filterHireMonth 検索時に使用する入社月
     */
    setFilterHireMonth({ commit }, filterHireMonth) {
      commit("setFilterHireMonth", filterHireMonth);
    },
    /**
     * ユーザー名を使用し、絞り込み検索する
     * @param {*} filterUserName 検索時に使用するユーザー名
     */
    setFilterUserName({ commit }, filterUserName) {
      commit("setFilterUserName", filterUserName);
    },
    /**
     * 既存の部署を削除するメソッド
     * @components/admin-setting/EditDeps.vueで利用
     * @param {*} deletedDep 削除する部署情報
     */
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
    deleteUser({ commit }, employee) {
      commit("deleteUser", employee.userId);
    },
    /**
     * お知らせ投稿一覧を取得するメソッド
     * @components/login/Login.vue
     */
    getNewsList({ commit }) {
      axios.get("/showNewsList").then((response) => {
        commit("setNewsPost", response.data);
      });
    },
    /**
     * 自分の投稿をstoreのemployeeListのdailyPostに格納する
     * @param {*} myDailyPost 自分の今日の投稿内容
     */
    setMyDailyPost({ commit }, myDailyPost) {
      commit("setMyDailyPost", myDailyPost);
    },
    //リロードすると消えてしまうEmp詳細
    setEmpDetail({ commit }, empDetail) {
      commit("setEmpDetail", empDetail);
    },
    setEmpDetailId({ commit }, userId) {
      commit("setEmpDetail", userId);
    },
    /**
     * ユーザー権限を変更した際に更新したユーザー情報をemployeeListに反映するメソッド
     * @/components/admin-setting/AuthorityModal.vue
     * @param {*} updatedUser 更新されたユーザー情報
     */
    updateUserAuthority({ commit }, updatedUser) {
      commit("updateUserAuthority", updatedUser);
    },
    /**
     * stateの値を初期化するメソッド
     * @/components/logout/Logout.vue
     */
    resetState({ commit }) {
      commit("resetState");
    },
  },

  getters: {
    /**
     * ログインユーザーの名前を取得する
     */
    userName: (state) => (state.loginUser ? state.loginUser.userName : ""),
    /**
     * ログインユーザーのアイコンをfirebaseから取得する
     */
    photoURL: (state) =>
      state.firebaseUser ? state.firebaseUser.photoURL : "",
    getStatus: function(state) {
      return state.loginStatus;
    },
  },
  modules:{
    filter
  },

  plugins: [createPersistedState({ storage: window.sessionStorage })], // オプションを追加
});
