<template>
  <div
    :class="rowBox"
    @mouseenter="enable"
    @mouseleave="disable"
  >
    <div
      class="addressrow__index"
      :class="columnDarkMode"
    >
      <slot
        name="index"
        :index-of-address="indexOfAddress"
      ></slot>
    </div>
    <div
      class="addressrow__personname"
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
      class="addressrow__email"
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
      class="addressrow__gender"
      :class="columnDarkMode"
    >
      <slot name="gender">
        <select
          class="addressrow__genderselect"
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
      class="addressrow__memo"
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
        @click="buttonEvent"
      >
        {{nameOfEvent}}
      </button>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "addressRow",
    data() {
      return {
        // For button fade if mouseover
        show: false,
        // inputs for addPerson
        personData: {
          name: '',
          gender: '',
          emailAddress: '',
          memo: ''
        },
        rowBox: {
          addressrow: true,
          'addressrow--first': this.type === 'first',
          'addressrow--other': !(this.type === 'first')
        }
      }
    },
    props: {
      // first / list / add
      type: {
        type: String,
        required: true
      },
      // use for scoped-slot
      index: {
        type: Number
      }
    },
    methods: {
      //trigger button fade if mouseover
      enable() {
        if(this.type !== 'first')
          this.show = true
      },
      disable(){
        if(this.type !== 'first')
          this.show = false
      },
      //type of event depending on type
      buttonEvent(){
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
      ...mapState(
        'sharing',
        {
          isDarkMode: state => state.darkMode
      }),
      //index of the Address
      indexOfAddress() {
        if(this.type === 'list')
          return this.index + 1
        else
          return 0
      },
      //for DarkMode
      columnDarkMode(){
        return {
          'addressrow__col--dark': this.isDarkMode,
          'addressrow__col--light': !this.isDarkMode,
          'addressrow__col': true
        }
      },
      buttonDarkMode(){
        return{
          'addressrow__button--dark': this.isDarkMode,
          'addressrow__button--light': !this.isDarkMode,
          'addressrow__button': true
        }
      },
      //name of event depending on type
      nameOfEvent() {
        if(this.type === 'list')
          return 'Remove'
        else
          return 'Add'
      }
    }
  }
</script>

<style scoped>
  .addressrow{
    margin-left: auto;
    margin-right: auto;
    border-top: gray 1px solid;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 850px;
  }
  .addressrow--first{
    height: 60px;
  }
  .addressrow--other{
    height: 40px;
  }

  .addressrow__col {
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
  .addressrow__col--dark {
    background-color: midnightblue;
    color: white;
  }
  .addressrow__col--light {
    background-color: white;
    color: black;
  }
  .addressrow__index {
    width: 7%;
  }
  .addressrow__personname {
    width: 20%;
  }
  .addressrow__email {
    width: 20%;
   }
  .addressrow__gender {
    width: 13%;
  }
  .addressrow__genderselect{
    cursor: pointer;
  }
  .addressrow__memo {
    width: 27%;
  }
  .addressrow__button {
    width: 10%;
    border-top: 0;
    border-bottom: 0;
    cursor: pointer;
  }
  .addressrow__button--light {
    border-left: 1px gray solid;
    border-right: 1px gray solid;
    background-color: white;
    color: black;
    transition: background-color .3s;
  }
  .addressrow__button--light:hover {
    background-color: gray;
  }
  .addressrow__button--dark {
    border-left: 1px white solid;
    border-right: 1px white solid;
    background-color: midnightblue;
    color: white;
    transition: background-color .3s;
  }
  .addressrow__button--dark:hover {
    background-color: dodgerblue;
  }

  .fade-enter-active, .fade-leave-active{
    transition: all .3s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>