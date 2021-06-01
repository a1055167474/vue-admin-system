<template>
  <div>
    <p>欢迎使用图书管理系统</p>
    <p>库存图书总量：本</p>
    <p>库存图书：种</p>
    <p>注册用户总数：人</p>
    <p>当前在线人数：人</p>
    <p>图书人气排行榜：（图）</p>
    <p>在线人数趋势图：（图）</p>
  </div>

</template>

<script>
import http from '../http/api'

export default {
  name: 'Welcome',
  methods: {
    getUserInfo () {
      http.getUserInfo().then(res => {
        // this.$message.success(res.message)
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
