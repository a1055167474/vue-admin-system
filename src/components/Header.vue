<template>
  <div class="header">
    <div class="icon" >
      <svg t="1621913845802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2400" width="81" height="81"><path d="M192.028 0.008c-47.06 0-85.34 38.282-85.34 85.342V853.34c0 11.782 9.53 21.312 21.342 21.312h106.654V0.008H192.028z" fill="#656D78" p-id="2401"></path><path d="M192.028 789.34c-35.374 0-63.998 28.656-63.998 64s28.624 63.996 63.998 63.996H896V789.34H192.028z" fill="#E6E9ED" p-id="2402"></path><path d="M917.312 21.352c0-11.782-9.562-21.344-21.312-21.344H234.684v810.644H896c11.75 0 21.312-9.532 21.312-21.312V21.352z" fill="#5D9CEC" p-id="2403"></path><path d="M384.026 874.652H213.34c-11.75 0-21.312-9.532-21.312-21.312s9.562-21.344 21.312-21.344h170.686c11.782 0 21.312 9.562 21.312 21.344s-9.532 21.312-21.312 21.312zM725.316 831.996c-11.75 0-21.312 9.562-21.312 21.344s9.562 21.312 21.312 21.312H896v-42.656h-170.684z" fill="#CCD1D9" p-id="2404"></path><path d="M320.026 149.35h490.662v255.996H320.026z" fill="#E6E9ED" p-id="2405"></path><path d="M128.03 170.678c11.782 0 21.312-9.546 21.312-21.328s-9.532-21.344-21.312-21.344H106.686v42.672h21.344zM128.03 298.676c11.782 0 21.312-9.546 21.312-21.328 0-11.78-9.532-21.342-21.312-21.342H106.686v42.67h21.344zM128.03 426.672c11.782 0 21.312-9.546 21.312-21.328 0-11.78-9.532-21.342-21.312-21.342H106.686v42.67h21.344zM128.03 554.656c11.782 0 21.312-9.532 21.312-21.312S139.81 512 128.03 512H106.686v42.656h21.344zM128.03 682.656c11.782 0 21.312-9.532 21.312-21.312S139.81 640 128.03 640H106.686v42.656h21.344zM725.316 298.676h-319.98c-11.75 0-21.312-9.546-21.312-21.328 0-11.78 9.562-21.342 21.312-21.342h319.98c11.812 0 21.376 9.562 21.376 21.342s-9.564 21.328-21.376 21.328z" fill="#434A54" p-id="2406"></path><path d="M917.312 917.336c0-11.782-9.562-21.344-21.312-21.344H234.684v42.656H896c11.75 0 21.312-9.53 21.312-21.312z" fill="#5D9CEC" p-id="2407"></path><path d="M234.684 895.992H192.028c-23.53 0-42.686-19.152-42.686-42.652 0-23.532 19.156-42.688 42.686-42.688h42.656v-42.656H192.028c-47.06 0-85.34 38.282-85.34 85.344 0 47.028 38.28 85.308 85.34 85.308h42.656v-42.656z" fill="#656D78" p-id="2408"></path><path d="M362.682 853.34H213.34v149.308c0 6.876 3.312 13.312 8.876 17.312s12.718 5.094 19.218 2.938l57.25-19.094 57.25 19.094c2.218 0.718 4.468 1.094 6.75 1.094 4.406 0 8.782-1.376 12.468-4.032 5.562-4 8.876-10.438 8.876-17.312V853.34h-21.346z" fill="#ED5564" p-id="2409"></path></svg>
        <span>数字图书馆</span>
    </div>
    <div class="hd-right">
      <!-- <el-button @click="switchSideBar">切换</el-button> -->
      <i v-if="!$store.state.sideBarCollapse" class="el-icon-s-fold" @click="switchSideBar"></i>
      <i v-if="$store.state.sideBarCollapse" class="el-icon-s-unfold" @click="switchSideBar"></i>

      <div class="info">
        <p style="color:#fff">欢迎您，{{this.$store.state.userinfo.account}}</p>
        <el-dropdown>
          <el-avatar>{{this.$store.state.userinfo.account || "无"}}</el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="editForm" @command="editForm">编辑信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout" @command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-dialog
      :title= dialogName
      :visible.sync="dialogVisible"
      @close="resetForm"
      width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input autocomplete="off" v-model="form.password" show-password></el-input>
        </el-form-item>
<!--        <el-form-item label="角色">-->
<!--          <el-select v-model="form.userRole" disabled  placeholder="请选择">-->
<!--            <el-option-->
<!--              v-for="item in options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkUpdateOrInsert(type, form)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import http from '../http/api'

export default {
  name: 'Header',
  data () {
    return {
      tableData: [],
      state: 0,
      tableLoading: false,
      dialogVisible: false,
      dialogName: '编辑',
      form: {
        name: '',
        account: '',
        phone: '',
        password: '',
        userRole: ''
      },
      options: [{
        value: '0',
        label: '普通用户'
      }, {
        value: '1',
        label: '管理员'
      }],
      value: '',
      value1: ''
    }
  },
  methods: {
    logout () {
      http.logout().then(res => {
        this.$store.commit('logout')
        this.$router.replace('/login')
      })
    },
    resetForm () {
      this.form = {
        name: '',
        age: '',
        length: '',
        email: ''
      }
      console.log(this.form)
    },
    editForm () {
      this.dialogVisible = true
      this.dialogName = '编辑'
      this.form.name = this.$store.state.userinfo.name
      this.form.account = this.$store.state.userinfo.account
      this.form.phone = this.$store.state.userinfo.phone
      this.form.password = this.$store.state.userinfo.password
      this.form.userRole = Number(this.$store.state.userinfo.userRole) === 1 ? '管理员' : '普通用户'
      this.form.id = this.$store.state.userinfo.id
      this.type = 'update'
    },
    switchSideBar () {
      console.log(11)
      this.$store.commit('switch_collapse')
    },
    returnToStart () {
      this.$router.push('/welcome');
    },
    checkUpdateOrInsert (type, form) {
      if (type === 'update') {
        this.updateTable(form)
      } else {
        this.insertUser(form)
      }
    },
    updateTable (form) {
      if (typeof form.userRole !== 'number') {
        form.userRole = form.userRole === '管理员' ? 1 : 0
      }
      http.updateUserList({
        ...form
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.dialogVisible = false
        this.queryUser()
      })
    },
    insertUser (form) {
      http.insertUserList({
        ...form
      }).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.dialogVisible = false
        this.queryUser()
      })
    }
  },
  created () {
    console.log('header')
  }
}
</script>

<style scoped>
.header{
  display: flex;

  /* align-items: center; */
  background-color: #1d2b40;
  height: 60px;
}
.hd-right{
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: space-between;
  width: calc(100% - 250px);
}
.icon {
  height: 60px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon svg{
  width: 40px;
  height: 40px;
}
.icon span{
  /* height: 24px; */
  font-family: 'FZYaoti';
  font-size: 28px;
  font-weight: 500;
  color: #fff;
}
.hd-right i{
  color: #fff;
  font-size: 35px;
  cursor: pointer;
}
.info{
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.info p{
  margin-right: 10px;
}
</style>
