<template>
  <table>
    <thead>
    <tr>
      <td>
        <select
          v-model="selectedSemester"
          @change="changeSemester(selectedSemester)"
        >
          <option
            v-for="name in semesterName"
            :key="name"
            :value="name"
          >
            {{ name }}
          </option>
        </select>
      </td>
    </tr>
    </thead>
    <tbody>
      <tr
        v-for="(gradeInfo, index) in gradeTable"
        :key="index"
      >
        <td>
          <input
            type="text"
            :value="gradeInfo.subject"
            @input="changeElement(
              [
                $event.target.value,
                index,
                'subject'
              ]
            )"
          >
        </td>
        <td>
          <select
            :value="gradeInfo.gradePoint"
            @change="changeElement(
              [
                $event.target.value,
                index,
                'gradePoint'
              ]
            )"
          >
            <option value="" disabled selected></option>
            <option
              v-for="name in gradePointName"
              :key="name"
              :value="name"
            >
              {{ name }}
            </option>
          </select>
        </td>
        <td>
          <select
            :value="gradeInfo.type"
            @input="changeElement(
              [
                $event.target.value,
                index,
                'type'
              ]
            )"
          >
            <option value="" disabled selected></option>
            <option value="major">major</option>
            <option value="culture">cultrue</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            :value="gradeInfo.credit"
            @input="changeElement(
              [
                parseInt($event.target.value),
                index,
                'credit'
              ]
            )"
          >
        </td>
        <td>
          <button
            @click="removeGradeTableRow(index)"
          >
            Remove
          </button>
        </td>
      </tr>
      <tr>
        <button
          @click="addGradeTableRow"
        >
          Add One
        </button>
        <button
          @click="applyGrade(selectedSemester)"
        >
          Apply
        </button>
        <button
          @click="resetGradeTable(selectedSemester)"
        >
          Reset
        </button>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { mapGetters, mapMutations, mapActions} from 'vuex'

  //TODO: 좌측에 각 과목별 과목명, 받은학점, 타입(교양/전공), 학점(몇학점짜리인지) 표
  // 여기서 mapgetters로 '현재 선택된 학기의 과목들의 학점' 데이터를 들고 있을 것

  //	인덱스 과목명 학점 타입 내학점
  //  ...
  // 위 모양과 같은 표(5*n)로 출력할 것
  export default {
    name: "GradeTable",
    data() {
      return {
        selectedSemester: '1학년 1학기',
        semesterName: [
          '1학년 1학기',
          '1학년 2학기',
          '2학년 1학기',
          '2학년 2학기',
          '3학년 1학기',
          '3학년 2학기',
          '4학년 1학기',
          '4학년 2학기',
          '5학년 1학기',
          '5학년 2학기'
        ],
        tableHeadName: [
          'Semester',
          'Subject',
          'Grade Point',
          'Type',
          'Credit'
        ],
        gradePointName: ['A+', 'A', 'B+', 'B', 'B-',
          'C+', 'C', 'D+', 'D', 'F', 'P', 'U']
      }
    },
    methods: {
      ...mapActions(
        'grade',
        {
          changeSemester: 'changeDisplayGradeArray',
          applyGrade: 'addGrade',
          resetGradeTable: 'removeGrade'
        }
      ),
      ...mapMutations(
        'grade',
        {
          addGradeTableRow: 'addElementDisplayGradeArray',
          removeGradeTableRow: 'removeElementDisplayGradeArray',
          changeElement: 'changeElementDisplayGradeArray'
        }
      )
    },
    computed: {
      ...mapGetters(
        'grade',
        {
          gradeTable: 'getDisplayGradeArray'
        }
      )
    },
    mounted() {
      this.changeSemester(this.selectedSemester)
    }
  }
</script>

<style scoped>

</style>