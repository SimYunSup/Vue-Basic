import Vue from 'vue'
import Vuex from 'vuex'
import sharing from './modules/sharing'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sharing
  },
  strict: true,
  plugins: []
})
