<template>
  <div>
    <background
      routing="Main"
    >
      <div
        v-for="{src, title, explain, address} in routeData"
        :key="title"
      >
        <list
          :img-src="src"
          :list-title="title"
          :list-explain="explain"
          :address="address"
        />
      </div>
    </background>
  </div>
</template>

<script>
  import list from '../components/Main/list'
  import background from '../components/sharing/background'
  export default {
    name: "Main",
    data(){
      return {
        routeData: [{
          src: 'https://images.pexels.com/photos/205414/pexels-photo-205414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          title: 'Address',
          explain: 'Address for Yunsup',
          address: '/address'
        }, {
          src: 'https://images.pexels.com/photos/1020323/pexels-photo-1020323.jpeg?cs=srgb&dl=agenda-calendar-data-1020323.jpg&fm=jpg',
          title: 'Calendar',
          explain: 'Calendar for Newbie',
          address: '/calendar'
        }, {
          title: 'Sups'
        }]
      }},
    components: {
      background,
      list
    }
  }
</script>

<style scoped>
</style>