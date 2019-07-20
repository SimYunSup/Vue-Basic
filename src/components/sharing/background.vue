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
          <foo
            facebook="https://www.facebook.com/pedogunu"
            email-address="pedogunu@gmail.com"
          >
            <h4>Pedogunu</h4>
          </foo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import foo from './foo'
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
          containerDark: this.$store.state.darkMode,
          containerLight: !this.$store.state.darkMode,
          container: true
        }
      }
    },
    components: {
      foo
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
    box-shadow:0 0 1px black;
  }
  .containerDark {
    background-color: midnightblue;
    color: white;
  }
  .containerLight {
    background-color: white;
    color: black;
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
    cursor: pointer;
    transition: background-color .2s;
    width: 6%;
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
    width: 9.25%;
    height: 31px;
  }
  .mainItem {
    width: 1000px;
  }
</style>