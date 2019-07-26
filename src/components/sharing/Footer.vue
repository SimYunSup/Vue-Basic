<template functional>
  <div class="footer">
    <div
      v-if="slots().default"
      class="footer__represents"
    >
      <slot></slot>
    </div>
    <div class="footer__connection">
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
  .footer {
    display: flex;
    justify-content: center;
    border-top: 1px gray solid;
    width: 1000px;
    height: 100px;
  }
  .footer__represents {
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    width: 300px;
    height: 100px;
  }
  .footer__connection {
    display: flex;
    float: left;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    width: 700px;
    height: 100%;
  }
</style>