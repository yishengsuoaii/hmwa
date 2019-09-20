import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: getItem('user-token')
  },
  getters: {},
  actions: {},
  mutations: {
    setToken (state, token) {
      state.userToken = token
      setItem('user-token', token)
    }
  }
})
