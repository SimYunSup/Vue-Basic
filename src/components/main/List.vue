<template>
  <transition
    name="fade"
  >
    <div
      class="list"
      v-if="show"
      @click="routing"
    >
      <div>
        <img
          class="list__img"
          :src="imgSrc"
          :alt="listTitle"
        >
      </div>
      <div class="list__text">
        <div class="list__title">
          {{listTitle}}
        </div>
        <div
          v-if="isExplain"
          class="list__explanation"
        >
          {{listExplanation}}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import image from '../../assets/sups.jpg'

  export default {
    name: "listMain",
    data() {
      return {
        show: true
      }
    },
    props: {
      imgSrc: {
        type: String,
        default: image
      },
      listTitle: {
        type: String,
        required: true
      },
      listExplanation: {
        type: String
      },
      address: {
        type: String
      }
    },
    methods: {
      isExplain(){
        return !!this.listExplain
      },
      //routing to Address
      routing(){
        if(this.address){
          this.$router.push('/view'+this.address)
        } else {
          this.show = false
        }
      }
    }
  }
</script>

<style scoped>
  .list {
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    margin-bottom: 25px;
    border: 1px gray solid;
    border-radius: 5px;
    cursor: pointer;
    transition: box-shadow .3s ease-in, width .4s ease, height .4s ease;
    width: 500px;
    height: 100px;
  }
  .list:hover{
    box-shadow: 2px 2px 1px black;
    width: 510px;
    height: 110px;
  }
  .list:hover .list__img{
    width: 110px;
    height: 110px;
  }
  .list:hover .text .list__title {
    font-size: 22px;
  }
  .list:hover .text .list__explanation{
    font-size: 1.1rem;
  }

  .list__text{
    float: left;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 5px;
    width: 385px;
  }

  .list__title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
    transition: all .4s;
    height: 20px;
  }

  .list__explanation{
    transition: all.4s;
    height: 70px;
  }

  .list__img {
    float: left;
    transition: all .4s;
    width: 100px;
    height: 100px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>