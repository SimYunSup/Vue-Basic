<template>
  <background
    routing="Address"
  >
    <div class="mainAddress">
      <address-row type="first">
        <template #index>Index</template>
        <template #name>Name</template>
        <template #email>Email</template>
        <template #gender>Gender</template>
        <template #memo>Memo</template>
      </address-row>
      <transition-group
        name="address"
      >
        <address-row
          v-for="(data, index) in personalData"
          :key="data.name"
          type="list"
          :index="index"
          @removePerson="removePersonal"
        >
          <template #index="{indexOfBox}">{{indexOfBox}}.</template>
          <template #name>{{data.name}}</template>
          <template #email>{{data.emailAddress}}</template>
          <template #gender>{{data.gender}}</template>
          <template #memo>{{data.memo}}</template>
        </address-row>
      </transition-group>
      <address-row
        type="add"
        @addPerson="pushPersonal"
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
      pushPersonal(data){
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
      removePersonal(index){
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
  .mainAddress {
    margin-left: auto;
    margin-right: auto;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .address-enter-active, .address-leave-active {
    transition: all .5s;
  }
  .address-enter, .address-leave-to {
    opacity: 0;
    transform: translateX(200px);
  }
</style>