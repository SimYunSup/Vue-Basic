<template>
  <table
    class="gradePoint"
  >
    <thead>
      <tr
        class="gradePoint__row"
      >
        <td
          class="gradePoint__header"
          v-for="name in tableHeadName"
          :key="name"
        >
          {{ name }}
        </td>
      </tr>
    </thead>
    <button @click="button">asdf</button>
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
            class="gradePoint__col"
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
      button() {
        console.log(this.getCreditArray)
      }
    },
    computed: mapGetters(
      'grade',
      ['getCreditArray']
    ),

  }
</script>

<style scoped>

</style>