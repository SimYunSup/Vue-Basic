<template>
  <div>
    <div class="list" v-if="show" @click="routing">
      <div>
        <img :src="imgSrc" :alt="listTitle">
      </div>
      <div class="text">
        <div class="text-title">
          {{listTitle}}
        </div>
        <div v-if="isExplain" class="text-explain">
          {{listExplain}}
        </div>
      </div>
    </div>
  </div>
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
      listExplain: {
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
      routing(){
        if(this.address){
          this.$router.push(this.address)
        } else {
          this.show = false
        }
      }
    }
  }
</script>

<style scoped>
  .list {
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    margin-bottom: 25px;
    border: 1px gray solid;
    transition: box-shadow .3s ease-in, width .4s ease, height .4s ease;
    width: 500px;
    height: 100px;
  }
  .list:hover{
    box-shadow: 2px 2px 1px black;
    width: 510px;
    height: 110px;
  }
  .list:hover img{
    width: 110px;
    height: 110px;
  }
  .list:hover .text .text-title {
    font-size: 22px;
  }
  .list:hover .text .text-explain{
    font-size: 1.1rem;
  }

  .text{
    float: left;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 5px;
    width: 385px;
  }

  .text-title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
    transition: all .4s;
    height: 20px;
  }

  .text-explain{
    transition: all.4s;
    height: 70px;
  }

  img {
    float: left;
    transition: all .4s;
    width: 100px;
    height: 100px;
  }
</style>