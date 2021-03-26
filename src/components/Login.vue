<template>
  <div class="bg">
    <div class="login-center">
      <el-tabs v-model="activeName" stretch @tab-click="handleClick" lazy>
        <el-tab-pane label="账号密码登录" name="first">
          <LoginInput />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import LoginInput from './LoginInput'
export default {
  name: 'Login',
  components: {LoginInput},
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.name === 'first') {
        this.$refs.videoLogin.closeVideo()
      } else if (this.$refs.videoLogin.initVideo) {
        console.log(this.$refs.videoLogin.initVideo)
        this.$refs.videoLogin.initVideo()
      }
    }
  }
}
</script>

<style scoped>
.bg{
  width: 100vw;
  height: 100vh;
  background: url("../assets/bg.jpg") repeat left top;
  overflow-y: hidden;
}
.login-center{
  width: 350px;
  background-color: #fff;
  height: 450px;
  margin: 60px auto;
  padding: 10px;
}
</style>
