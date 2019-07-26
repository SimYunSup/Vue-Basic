<template>
  <background
    routing="Address"
  >
    <div class="address">
      <address-row type="first">
        <template #index>Index</template>
        <template #name>Name</template>
        <template #email>Email</template>
        <template #gender>Gender</template>
        <template #memo>Memo</template>
      </address-row>
      <transition-group
        name="address-fade"
      >
        <address-row
          v-for="(data, index) in personalData"
          :key="data.name"
          type="list"
          :index="index"
          @removePerson="removePersonalData"
        >
          <template #index="{indexOfAddress}">{{indexOfAddress}}.</template>
          <template #name>{{data.name}}</template>
          <template #email>{{data.emailAddress}}</template>
          <template #gender>{{data.gender}}</template>
          <template #memo>{{data.memo}}</template>
        </address-row>
      </transition-group>
      <address-row
        type="add"
        @addPerson="addPersonalData"
      ></address-row>
    </div>
  </background>
</template>

<script>
  import background from '../components/sharing/Background'
  import addressRow from '../components/address/AddressRow'
  export default {
    name: "Address",
    data() {
      return {
        //  name / emailAddress / gender / memo(optional)
        personalData: [
          {
            name: 'Sim Yunsup',
            emailAddress: 'pedogunu@gmail.com',
            gender: 'Male',
            memo: 'FrontEnd Beginner'
          },
          {
            name: 'Lisa',
            emailAddress: 'alias@naver.com',
            gender: 'Female',
            memo: 'maple syrup'
          },
          {
            name: 'Hangi Dae',
            emailAddress: 'hangi@koreatech.ac.kr',
            gender: 'Male',
            memo: 'Zukpae'
          }
        ]
      }
    },
    methods: {
      // if addPerson event
      addPersonalData(data){
        // make array include values of object
        let values = Object.values(data)
        let count = 0
        const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        for(let i=0;i<values.length - 1;i++) {
          if (values[i] === '') {
            alert('값을 입력하세요.')
            return
          }
          if(emailReg.test(values[i])){
            count++
          }
        }

        if(count < 1){
          alert('Email 형식을 지켜주세요.')
          return
        }

        this.personalData.push(data)
      },
      //if removePerson event
      removePersonalData(index){
        this.personalData.splice(index, 1)
      }
    },
    components: {
      background,
      addressRow
    }
  }
</script>

<style scoped>
  .address {
    margin-left: auto;
    margin-right: auto;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .address-fade-enter-active, .address-fade-leave-active {
    transition: all .5s;
  }
  .address-fade-enter, .address-fade-leave-to {
    opacity: 0;
    transform: translateX(200px);
  }
</style>