import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: {
      page: '存储信息'
    },
    keepAlive: [''],
    wandList:''

  },
  mutations: {
    updateMess: (state, paylod) => {
      state.message.page = paylod
    },
    setKeepAlive (state, keepAlive) {
      state.keepAlive = keepAlive
    },
    uploadWang:(state,paylod)=>{
      state.wandList = paylod
    }

  },
  getters: {
    keepAlive: state => {
      return state.keepAlive
    },
    wandList:state=>state.wandList
    // message: state => state.message
  },
  actions: {

  },
  modules: {
  }
})
