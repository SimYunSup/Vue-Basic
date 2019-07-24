<template functional>
  <div class="foo">
    <div
      v-if="slots().default"
      class="represents"
    >
      <slot></slot>
    </div>
    <div class="devSpaceWith">
      <a :href="props.facebook">Dev's Facebook</a>
      <a :href="'mailto:'+props.emailAddress">Dev's Email</a>
    </div>
  </div>
</template>

<script>
  export default {
    functional: true,
    props: {
      facebook: {
        type: String,
        required: true
      },
      emailAddress: {
        type: String,
        vaildator(value) {
          const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          return email.test(value)
        }
      }
    }
  }
</script>

<style scoped>
  .foo {
    display: flex;
    justify-content: center;
    border-top: 1px gray solid;
    width: 1000px;
    height: 100px;
  }
  .represents {
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    width: 300px;
    height: 100px;
  }
  .devSpaceWith {
    display: flex;
    float: left;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    width: 700px;
    height: 100%;
  }
</style>