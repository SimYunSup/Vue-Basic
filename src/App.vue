<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        transitionName: 'silde-left'
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-fade-right' : 'slide-fade-left'
      }
    }
  }
</script>

<style>
.slide-fade-right-enter-active, .slide-fade-right-leave-active {
  transition: all .3s ease;
}
.slide-fade-right-enter {
  transform: translateX(-500px) scale(0.8);
  opacity: 0;
}
.slide-fade-right-leave-to {
  transform: translateX(500px) scale(0.8);
  opacity: 0;
}

.slide-fade-left-enter-active, .slide-fade-left-leave-active {
  transition: all .3s ease;
}
.slide-fade-left-enter {
  transform: translateX(500px) scale(0.8);
  opacity: 0;
}
.slide-fade-left-leave-to {
  transform: translateX(-500px) scale(0.8);
  opacity: 0;
}
</style>
