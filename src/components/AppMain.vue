<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return []
    },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  overflow-x: hidden;
  padding: 10px 15px;
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
