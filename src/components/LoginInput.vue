<template>
  <div class="login-input">
    <img src="../assets/logo.png" alt="">
    <el-input placeholder="请输入账号" v-model="account">
      <template slot="prepend">账号</template>
    </el-input>
    <el-input placeholder="请输入密码" v-model="password" suffix-icon="el-icon-view" type="password" @keydown.enter.native="login">
      <template slot="prepend">密码</template>
    </el-input>
    <!--    <p>忘记密码</p>-->
    <el-button type="primary" class="loginbtn" @click="login" @keydown.enter="login">登录</el-button>
  </div>
</template>

<script>
import http from '../http/api'
export default {
  name: 'LoginInput',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      http.login({
        account: this.account,
        password: this.password
      }).then(res => {
        // console.log(res)
        this.$message.success(res.message)
        this.$store.commit('set_userInfo', res.result['userId'])
        this.$store.commit('set_isLogin', true)
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
.login-input{
  height: 100%;
  text-align: center;
}
.login-input > span{
  margin-top: 10px;
}
.el-input{
  margin-top: 20px;
}
.loginbtn{
  width: 100%;
  margin-top: 15px;
}
</style>
