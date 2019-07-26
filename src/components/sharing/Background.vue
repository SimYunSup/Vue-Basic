<template>
  <div>
    <div class="background">
      <div :class="containeDarkMode">
        <div class="background__header">
          <div
            :class="backButtonDarkMode"
            @click="goToHome"
          >
            Home
          </div>
          <div class="background__headertext">
            {{routing}}
          </div>
          <div class="background__modarea">
            <div
              class="background__mod--dark"
              @click="changeDark"
            ></div>
            <div
              class="background__mod--light"
              @click="changeLight"
            ></div>
          </div>
        </div>
        <div class="background__main">
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
      ...mapMutations(
        'sharing',
        ['changeDark', 'changeLight']),
      goToHome(){
        this.$router.push('/')
      }
    },
    computed: {
      ...mapGetters(
        'sharing',
        ['isDarkMode']),
      ...mapGetters(
        'sharing',
        {
          isDarkMode2: "isDarkMode"
      }),
      containeDarkMode(){
        return {
          'background__container--dark': this.isDarkMode,
          'background__container--light': !this.isDarkMode,
          'background__container': true
        }
      },
      backButtonDarkMode(){
        return {
          'background__homebutton--dark': this.isDarkMode2,
          'background__homebutton--light': !this.isDarkMode2,
          'background__homebutton': true
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

  .background__container {
    margin: 0 auto;
    width: 1000px;
    box-shadow:0 0 1px black;
  }
  .background__container--dark {
    background-color: midnightblue;
    color: white;
  }
  .background__container--light {
    background-color: white;
    color: black;
  }

  .background__header{
    border-bottom: .5px gray solid;
    height: 36px;
  }
  .background__homebutton {
    float: left;
    padding-top: 6px;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    width: 6%;
    height: 31px;
  }
  .background__homebutton--light {
    transition: background-color .2s;
  }
  .background__homebutton--light:hover {
    background-color: gray;
  }
  .background__homebutton--dark {
    transition: background-color .2s;
  }
  .background__homebutton--dark:hover {
    background-color: dodgerblue;
  }

  .background__modarea{
    float: right;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-left: 1px gray solid;
    width: 10%;
    height: 100%;
  }
  .background__mod--light{
    border: black 1px solid;
    border-radius: 2px;
    cursor: pointer;
    background-color: white;
    width: 20px;
    height: 20px;
  }
  .background__mod--dark{
    border: white 1px solid;
    border-radius: 2px;
    cursor: pointer;
    background-color: midnightblue;
    width: 20px;
    height: 20px;
  }

  .background__headertext {
    float: left;
    padding-top: 6px;
    font-weight: bold;
    vertical-align: middle;
    padding-left: 15px;
    width: 9.25%;
    height: 31px;
  }
  .background__main {
    width: 1000px;
  }
</style>