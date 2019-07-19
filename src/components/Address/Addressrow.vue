<template>
  <div
    :class="rowBox"
    @mouseenter="showing"
    @mouseleave="showing"
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
          v-model="personData.name">
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
        >
      </slot>
    </div>
    <div
      class="gender"
      :class="columnDarkMode"
    >
      <slot name="gender">
        <select
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
        >
      </slot>
    </div>
    <transition name="fade">
      <button
        class="button"
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
      showing() {
        if(this.type !== 'first')
          this.show = !this.show
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
          columnDark: !!this.$store.darkMode,
          columnLight: !this.$store.darkMode,
          column: true
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
    border-bottom: gray 1px solid;
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
    font-size: 100%;
    height: 100%;
  }
  .columnDark {
    background-color: midnightblue;
    text-decoration-color: white;
  }
  .columnLight {
    background-color: white;
    text-decoration-color: black;
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
  .memo {
    width: 30%;
  }
  .button {
    width: 10%
  }
</style>