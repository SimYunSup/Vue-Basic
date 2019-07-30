const state = {
  //Array for Objects
  //Objects' properties: semester, gradeArray
  //GradeArray is also Array for Objects about gradeTable
  //Second Objects' properties: subject, gradePoint, type, credit
  grades: [
    {
    semester: '1학년 1학기',
    gradeArray: [{
      subject: 'asdf',
      gradePoint: 'A',
      type: 'major',
      credit: 4
    }]
    },
    {
      semester: '1학년 2학기',
      gradeArray: [{
        subject: 'assd',
        gradePoint: 'A',
        type: 'culture',
        credit: 4
      }]
    }
  ],
  //For GradeTable component to display gradeArray / select tag
  displayGradeArray: [],
  filterStatus: '',
  selectedSemester: '1학년 1학기'
}

const getters = {
  findGradeIndex: (state) => (semester) => {
    return state.grades.findIndex(
      (element) => {
        return element.semester === semester
      }
    )
  },
  getDisplayGradeArray(state) {
    return state.displayGradeArray
  },
  getCreditArray({grades}) {
    let array = []

    for(let i = 0; i < grades.length; i++){
      let major = 0
      let culture = 0
      let gradeArray = grades[i].gradeArray

      for(let j = 0; j < gradeArray.length; j++) {
        if (gradeArray[j].type === 'culture')
          culture += gradeArray[j].credit
        else
          major += gradeArray[j].credit
      }

      array.push([
        grades[i].semester,
        major,
        culture,
        major + culture
      ])

    }

    return array
  },
  //not used
  getAverageGradePointArray({ grades }) {
    let array = []
    let gradePointTotal = 0
    let creditTotal = 0

    for(let i = 0; i < grades.length; i++){
      let gradePoint = 0
      let credit = 0
      let gradeArray = grades[i].gradeArray

      for(let j = 0; j < gradeArray.length; j++){
        switch(gradeArray[j].gradePoint){
          case 'A+':
            gradePoint += 0.5
          // eslint-disable-next-line no-fallthrough
          case 'A':
            gradePoint += 0.5
          // eslint-disable-next-line no-fallthrough
          case 'B+':
            gradePoint += 0.5
          // eslint-disable-next-line no-fallthrough
          case 'B':
            gradePoint += 0.5
          // eslint-disable-next-line no-fallthrough
          case 'B-':
            gradePoint += 0.5
          // eslint-disable-next-line no-fallthrough
          case 'C+':
            gradePoint += 0.5
          // eslint-disable-next-line no-fallthrough
          case 'C':
            gradePoint += 0.5
          // eslint-disable-next-line no-fallthrough
          case 'D+':
            gradePoint += 0.5
          // eslint-disable-next-line no-fallthrough
          case 'D':
            gradePoint += 0.5
          // eslint-disable-next-line no-fallthrough
          case 'F':
            credit += gradeArray.credit
            break
          default:
        }
      }

      gradePointTotal += gradePoint
      creditTotal += credit
      array.push([
        grades[i].semester,
        ((gradePoint / credit).toFixed(2))
      ])
    }

    array.push(
        (gradePointTotal / creditTotal)
        .toFixed(2)
      )

    return array
  }
}

const mutations = {
  addGrade({ grades }, gradeInfo) {
    let index = grades.findIndex(
      (el) => {
        return el.semester[0] * 10 + el.semester[4] * 1 >
          gradeInfo.semester[0] * 10 + gradeInfo.semester[4] * 1
      }
    )
    grades.splice(index, 0, gradeInfo)
  },
  changeGrade({ grades }, gradeInfoArray) {
    grades.splice(gradeInfoArray[0], 1, gradeInfoArray[1])
  },
  removeGrade({ grades }, index) {
    grades.splice(index, 1)
  },
  changeSemester(state, semester) {
    state.selectedSemester = semester
  },
  setDisplayGradeArray(state, index) {
    if(index !== -1) {
      let gradeArray = []
      for(let i = 0; i < state.grades[index].gradeArray.length; i++)
        gradeArray.push(state.grades[index].gradeArray[i])
      for(let i = gradeArray.length; i < 8; i++){
        gradeArray.push({
          subject: '',
          gradePoint: '',
          type: '',
          credit: null
        })

        state.displayGradeArray = gradeArray
      }
    } else {
      state.displayGradeArray = Array
        .apply(null, {length: 8})
        .fill( {
          subject: '',
          gradePoint: '',
          type: '',
          credit: null
        }
      )
    }
  },
  //for @input element inside gradeTable in GradeTable component
  //elementInfo = [changedValue, gradeArrayIndex, property]
  changeElementDisplayGradeArray(state, elementInfo){
    state.displayGradeArray[elementInfo[1]][elementInfo[2]] = elementInfo[0]
  },
  addElementDisplayGradeArray({ displayGradeArray }) {
    displayGradeArray.push({
      subject: '',
      gradePoint: '',
      type: '',
      credit: null
    })
  },
  removeElementDisplayGradeArray({ displayGradeArray }, index) {
    displayGradeArray.splice(index, 1)
  },
  filterDisplayGradeArray(state) {
    let gradeArray = Array
      .apply(null, {length:state.displayGradeArray.length})
      .map(
        (element, index) => {
          const gradeInfo = {}

          gradeInfo.subject = state.displayGradeArray[index].subject
          gradeInfo.gradePoint = state.displayGradeArray[index].gradePoint
          gradeInfo.type = state.displayGradeArray[index].type
          gradeInfo.credit = state.displayGradeArray[index].credit
          return gradeInfo
        }
      )
      .filter(
        element => {
          let value = Object.values(element)

          for(let i = 0; i < value.length; i++)
            if(value[i])
              return true
        }
      )
    for(let i = 0; i < gradeArray.length - 1; i++){
      let value = Object.values(gradeArray[i])
      let count = 0

      for(let j = 0; j < value.length; j++)
        if(!value[j])
          count++

      if(count === 4) {
        gradeArray.splice(i, 1)
      } else if(count > 0) {
        state.filterStatus = 'Blank Exists'
        return
      }
    }
    if(gradeArray === []){
      state.filterStatus = 'Remove GradeArray'
    }
    else {
      state.filterStatus = 'Success'
      state.displayGradeArray = gradeArray
    }
  }
}

const actions = {
  //This is for apply from GradeTable Component
  //gradeInfo is like grade element
  addGrade({ state, getters, commit, dispatch }) {
    let index = getters.findGradeIndex(state.selectedSemester)
    commit('filterDisplayGradeArray')
    if(state.filterStatus === 'Blank Exists')
      alert('빈 칸을 모두 채우세요')
    else if (state.filterStatus === 'Success'){
      if(index === -1)
        commit('addGrade', {
            semester: state.selectedSemester,
            gradeArray: state.displayGradeArray
          }
        )
      else
        commit('changeGrade', [
            index,
            {
              semester: state.selectedSemester,
              gradeArray: state.displayGradeArray
            }
          ]
        )
    } else {
      dispatch('removeGrade', semester)
    }
  },
  //This is for reset from GradeTable Component
  removeGrade({ getters, commit }, semester) {
    let index = getters.findGradeIndex(semester)

    commit('removeGrade', index)
  },
  changeDisplayGradeArray({ getters, commit }, semester) {
    let index = getters.findGradeIndex(semester)

    commit('changeSemester', semester)
    commit('setDisplayGradeArray', index)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}