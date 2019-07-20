import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false
  },
  mutations: {
    toggleDark(state){
      state.darkMode = true
    },
    toggleLight(state){
      state.darkMode = false
    }
  },
  actions: {

  }
})
