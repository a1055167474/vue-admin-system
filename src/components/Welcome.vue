<template>
  <div>
    <p>欢迎使用图书管理系统</p>
  </div>

</template>

<script>
import http from '../http/api'

export default {
  name: 'Welcome',
  methods: {
    getUserInfo () {
      http.getUserInfo().then(res => {
        this.$message.success(res.message)
        this.$store.commit('set_userInfo', res.result)
          console.log(res.result)
        this.$store.commit('set_isLogin', true)
      })
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style scoped>

</style>
