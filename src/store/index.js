import Vue from 'vue'
import Vuex from 'vuex'
import sharing from './modules/Sharing'
import grade from './modules/Grade'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sharing,
    grade
  },
  strict: true,
  plugins: []
})
