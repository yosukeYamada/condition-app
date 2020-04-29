import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app"
import "firebase/auth"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    mail: '',
    loading: true
  },
  mutations: {
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    setLoading(state) {
      state.loading = false
    },
    setLoadings(state) {
      state.loading = false
    },
    loading(state) {
      state.loading = true
    }
  },
  actions: {
    login({commit}) {
      commit('loading')
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
    },
    setLoading({commit}) {
      commit('setLoading')
    },
    setLoadings({commit}) {
      commit('setLoadings')
    }
  },
  modules: {
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : ''
  }
})