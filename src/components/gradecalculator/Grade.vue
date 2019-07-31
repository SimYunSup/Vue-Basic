<template>
  <table
    class="gradePoint"
  >
    <thead>
      <tr
        class="gradePoint__row"
      >
        <td
          :class="gradePointHeaderMode(index)"
          v-for="(name, index) in tableHeadName"
          :key="name"
        >
          {{ name }}
        </td>
      </tr>
    </thead>
    <template
      v-if="this.getCreditArray.length !== 0"
    >
      <tbody key="creditExist">
        <tr
          class="gradePoint__row"
          v-for="(credits, index) in getCreditArray"
          :key="index"
        >
          <td
            :class="gradePointColMode(index)"
            v-for="(column, index) in credits"
            :key="index"
          >
            {{ column }}
          </td>
        </tr>
      </tbody>
    </template>
    <template v-else>
      <tbody key="creditNotExist">
        <tr>
          <td colspan="4">없습니다.</td>
        </tr>
      </tbody>
    </template>
  </table>
</template>

<script>
  import { mapGetters } from 'vuex'

  //TODO: 우측에 학기별 전공/교양 구분한 학점 합 출력
  // 여기서 mapgetters로 '현재 선택된 학기의 과목들의 학점' 데이터를 들고 있을 것
  //	  	전공 교양 총합
  // 학점
  // 위 모양과 같은 표(4*2)로 출력할 것
  export default {
    name: "Grade",
    data() {
      return {
        tableHeadName: [
          '학기',
          '전공',
          '교양',
          '총합'
        ]
      }
    },
    methods: {
      gradePointColMode(index) {
        return {
          'gradePoint__col': true,
          'gradePoint__col--first': index === 0,
          'gradePoint__col--other': index !== 0
        }
      },
      gradePointHeaderMode(index) {
        return {
          'gradePoint__header': true,
          'gradePoint__header--first': index === 0,
          'gradePoint__header--other': index !== 0
        }
      }
    },
    computed: mapGetters(
      'grade',
      ['getCreditArray']
    )
  }
</script>

<style scoped>
  .gradePoint {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  .gradePoint__row {
    display: flex;
    flex-direction: row;
    width: 250px;
    height: 40px;
  }
  .gradePoint__header{
    text-align: center;
    margin: 5px;
    border-bottom: 1px gray solid;
  }
  .gradePoint__header--first {
    text-align: center;
    width: 145px;
  }
  .gradePoint__header--other {
    text-align: end;
    width: 55px;
  }

  .gradePoint__col {
    margin: 5px;
  }
  .gradePoint__col--first {
    text-align: center;
    width: 145px;
  }
  .gradePoint__col--other {
    text-align: end;
    width: 55px;
  }
</style>