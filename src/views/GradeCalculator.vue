<template>
  <background
    routing="GradeCalculator"
  >
    <grade></grade>
    <grade-table></grade-table>
  </background>
</template>

<script>
  import background from '../components/sharing/Background'
  import grade from '../components/gradecalculator/Grade'
  import gradeTable from '../components/gradecalculator/GradeTable'

  //TODO: grade추가
  //TODO: props 사용금지

  export default {
    name: "GradeCalculator",
    components: {
      background,
      grade,
      gradeTable
    }
  }
</script>

<style scoped>

</style>