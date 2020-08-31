import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: {
      page: '存储信息'
    },
    keepAlive: ['']

  },
  mutations: {
    updateMess: (state, paylod) => {
      state.message.page = paylod
    },
    setKeepAlive (state, keepAlive) {
      state.keepAlive = keepAlive
    }
  },
  getters: {
    keepAlive: state => {
      return state.keepAlive
    }
    // message: state => state.message
  },
  actions: {

  },
  modules: {
  }
})
