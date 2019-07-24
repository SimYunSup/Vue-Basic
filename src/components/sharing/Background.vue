<template>
  <div>
    <div class="background">
      <div :class="containeDarkMode">
        <div class="backgroundHeader">
          <div
            :class="backButtonDarkMode"
            @click="home"
          >
            Home
          </div>
          <div class="headerText">
            {{routing}}
          </div>
          <div class="changeMode">
            <div class="changeDark" @click="toggleDark"></div>
            <div class="changeLight" @click="toggleLight"></div>
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
  import foo from './Footer'
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    name: "background",
    props: {
      routing: {
        type: String,
        required: true
      }
    },
    methods: {
      ...mapMutations(['changeDark', 'changeLight']),
      home(){
        this.$router.push('/')
      }
    },
    computed: {
      ...mapGetters({
        isDarkMode: "isDarkMode"
      }),
      containeDarkMode(){
        return {
          containerDark: this.isDarkMode,
          containerLight: !this.isDarkMode,
          container: true
        }
      },
      backButtonDarkMode(){
        return {
          backButtonDark: this.$store.state.darkMode,
          backButtonLight: !this.$store.state.darkMode,
          backButton: true
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
    width: 6%;
    height: 31px;
  }
  .backButtonLight {
    transition: background-color .2s;
  }
  .backButtonLight:hover {
    background-color: gray;
  }
  .backButtonDark {
    transition: background-color .2s;
  }
  .backButtonDark:hover {
    background-color: dodgerblue;
  }

  .changeMode{
    float: right;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-left: 1px gray solid;
    width: 10%;
    height: 100%;
  }
  .toggleLight{
    border: black 1px solid;
    border-radius: 2px;
    cursor: pointer;
    background-color: white;
    width: 20px;
    height: 20px;
  }
  .toggleDark{
    border: white 1px solid;
    border-radius: 2px;
    cursor: pointer;
    background-color: midnightblue;
    width: 20px;
    height: 20px;
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