<template>
  <background
    routing="Main"
  >
    <list
      v-for="{src, title, explanation, address} in routeData"
      :key="title"
      :img-src="src"
      :list-title="title"
      :list-explanation="explanation"
      :address="address"
    />
  </background>
</template>

<script>
  import list from '../components/main/List'
  import background from '../components/sharing/Background'

  export default {
    name: "Main",
    data() {
      return {
        //title / src(optional) / explanation(optional) / address (optional)
        routeData: [{
          src: 'https://images.pexels.com/photos/205414/pexels-photo-205414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          title: 'Address',
          explanation: 'address for Yunsup',
          address: '/address'
        }, {
          src: 'https://images.pexels.com/photos/1020323/pexels-photo-1020323.jpeg?cs=srgb&dl=agenda-calendar-data-1020323.jpg&fm=jpg',
          title: 'calendar',
          explanation: 'calendar for Newbie',
          address: '/calendar'
        }, {
          title: 'GradeCalculator',
          explanation: 'GradeCalculator for KOREATECH',
          address: '/gradecalculator'
        }, {
          title: 'Sups'
        }]
      }
    },
    components: {
      background,
      list
    }
  }
</script>

<style scoped>
</style>