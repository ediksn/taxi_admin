import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    tokenappolo: '',
    usuario: []
  },
  mutations: {
    login(state,data){
      state.usuario = data.user
      state.tokenappolo = data.token
    },
    logout(state){
      state.sesion = []
      state.usuario = []
      state.tokenappolo = ''
    },
    usuario(state, data) {
      state.usuario = data
    },
  },
  actions: {
    login({commit}, data){
      commit("login", data)
    },
    logout({commit}){
      commit("logout")
    },
    setuser({commit},data) {
      commit("usuario", data)
    },
  },
});