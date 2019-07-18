<template>
  <div>
    <div class="background">
      <div :class="darkMode">
        <div class="backgroundHeader">
          <div
            class="backButton"
            @click="home"
          >
            Home
          </div>
          <div class="headerText">
            {{routing}}
          </div>
        </div>
        <div class="mainItem">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "background",
    props: {
      routing: {
        type: String,
        required: true
      }
    },
    methods: {
      home(){
        this.$router.push('/')
      }
    },
    computed: {
      darkMode(){
        return {
          containerDark: this.$store.darkMode,
          containerLight: !this.$store.darkMode,
          container: true
        }
      }
    }
  }
</script>

<style scoped>
  .background{
    height: 100vh;
  }

  .container {
    margin: 0 auto;
    width: 1000px;
    height: 90vh;
    box-shadow:0 0 1px black;
  }
  .containerDark {
    background-color: midnightblue;
    text-decoration-color: white;
  }
  .containerLight {
    background-color: white;
    text-decoration-color: black;
  }

  .backgroundHeader{
    border-bottom: .5px gray solid;
    height: 36px;
  }
  .backButton {
    float: left;
    padding-top: 6px;
    justify-content: center;
    text-align: center;
    transition: background-color .2s;
    width: 60px;
    height: 31px;
  }
  .backButton:hover {
    background-color: gray;
  }
  .headerText {
    float: left;
    padding-top: 6px;
    font-weight: bold;
    vertical-align: middle;
    padding-left: 15px;
    width: 925px;
    height: 31px;
  }
  .mainItem {
    width: 1000px;
    height: auto;
  }
</style>