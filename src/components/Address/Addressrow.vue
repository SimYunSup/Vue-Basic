<template>
  <div
    :class="rowBox"
    @mouseenter="enable"
    @mouseleave="disable"
  >
    <div
      class="index"
      :class="columnDarkMode"
    >
      <slot
        name="index"
        :index-of-box="indexOfBox"
      ></slot>
    </div>
    <div
      class="name"
      :class="columnDarkMode"
    >
      <slot name="name">
        <input
          :class="columnDarkMode"
          type="text"
          v-model="personData.name"
          placeholder="Name"
        >
      </slot>
    </div>
    <div
      class="email"
      :class="columnDarkMode"
    >
      <slot name="email">
        <input
          :class="columnDarkMode"
          type="text"
          v-model="personData.emailAddress"
          placeholder="Email Address"
        >
      </slot>
    </div>
    <div
      class="gender"
      :class="columnDarkMode"
    >
      <slot name="gender">
        <select
          class="genderSelect"
          :class="columnDarkMode"
          v-model="personData.gender"
        >
          <option selected disabled></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </slot>
    </div>
    <div
      class="memo"
      :class="columnDarkMode"
    >
      <slot name="memo">
        <input
          :class="columnDarkMode"
          type="text"
          v-model="personData.memo"
          placeholder="Memo"
        >
      </slot>
    </div>
    <transition name="fade">
      <button
        :class="buttonDarkMode"
        v-if="show"
        @click="listEvent"
      >
        {{isType}}
      </button>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "addressRow",
    data() {
      return {
        show: false,
        personData: {
          name: '',
          gender: '',
          emailAddress: '',
          memo: ''
        },
        rowBox: {
          box: true,
          firstBox: this.type === 'first',
          otherBox: !(this.type === 'first')
        }
      }
    },
    props: {
      type: {
        type: String,
        required: true
      },
      index: {
        type: Number
      }
    },
    methods: {
      enable() {
        if(this.type !== 'first')
          this.show = true
      },
      disable(){
        if(this.type !== 'first')
          this.show = false
      },
      listEvent(){
        if(this.type === 'list')
          this.$emit('removePerson', this.index)
        else if(this.type === 'add'){
          let person = this.personData
          Object.assign(this.$data, this.$options.data())
          this.$emit('addPerson', person)
        }
      }
    },
    computed: {
      indexOfBox() {
        if(this.type === 'list')
          return this.index + 1
        else
          return 0
      },
      columnDarkMode(){
        return {
          columnDark: this.$store.state.darkMode,
          columnLight: !this.$store.state.darkMode,
          column: true
        }
      },
      buttonDarkMode(){
        return{
          buttonDark: this.$store.state.darkMode,
          buttonLight: !this.$store.state.darkMode,
          button: true
        }
      },
      isType() {
        if(this.type === 'list')
          return 'Remove'
        else
          return 'Add'
      }
    }
  }
</script>

<style scoped>
  .box{
    margin-left: auto;
    margin-right: auto;
    border-top: gray 1px solid;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 850px;
  }
  .firstBox{
    height: 60px;
  }
  .otherBox{
    height: 40px;
  }

  .column {
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 100%;
    width: 100%;
    height: 80%;
  }
  .columnDark {
    background-color: midnightblue;
    color: white;
  }
  .columnLight {
    background-color: white;
    color: black;
  }
  .index {
    width: 7%;
  }
  .name {
    width: 20%;
  }
  .email {
    width: 20%;
   }
  .gender {
    width: 13%;
  }
  .genderSelect{
    cursor: pointer;
  }
  .memo {
    width: 27%;
  }
  .button {
    width: 10%;
    border-top: 0;
    border-bottom: 0;
    cursor: pointer;
  }
  .buttonLight {
    border-left: 1px gray solid;
    border-right: 1px gray solid;
    background-color: white;
    color: black;
    transition: background-color .3s;
  }
  .buttonLight:hover {
    background-color: deepskyblue;
  }

  .fade-enter-active, .fade-leave-active{
    transition: all .3s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>