const state = {
  //state for darkMode
  //Initial state is Light
  darkMode: false
}

const getters = {
  //darkMode getter function
  isDarkMode(state){
    return state.darkMode
  }
}

const mutations= {
  //change to Dark
  changeDark(state){
    state.darkMode = true
  },
  //change to Light
  changeLight(state){
    state.darkMode = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}