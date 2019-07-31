<template>
  <background
    routing="GradeCalculator"
  >
    <div
      class="gradecalculator"
    >
      <div
        class="gradecalculator__gradetable"
      >
        <grade-table/>
      </div>
      <div
        class="gradecalculator__grade"
      >
        <grade/>
      </div>
    </div>
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
  .gradecalculator {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .gradecalculator__gradetable {
    display: flex;
    width: 65%;
  }
  .gradecalculator__grade {
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
    width: 35%;
  }
</style>