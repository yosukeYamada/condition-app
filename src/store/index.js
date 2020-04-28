import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app"
import "firebase/auth"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    mail: ''
  },
  mutations: {
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    setLoding(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
  },
    setLoginUser({commit}, user) {
      commit('setLoginUser', user)
    },
    logout() {
      firebase.auth().signOut()
    },
    deleteLoginUser({commit}) {
      commit('deleteLoginUser')
    }
  },
  modules: {
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : ''
  }
})