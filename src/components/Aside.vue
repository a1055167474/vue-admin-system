<template>
    <el-menu style="height: 100%"
             :default-active="$route.path"
             class="el-menu-vertical-demo"
             unique-opened
             :collapse="collapse"
             :collapse-transition="false"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             router>
      <el-menu-item index="/welcome">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>人员管理</span>
        </template>
        <el-menu-item index="/index">用户信息</el-menu-item>
        <el-menu-item index="/test">test</el-menu-item>
<!--        <el-menu-item index="/welcome">首页</el-menu-item>-->
      </el-submenu>
      <el-submenu index="/ts">
        <template slot="title">
          <i class="el-icon-reading"></i>
          <span>图书管理</span>
        </template>
        <el-menu-item index="/ts/tt">库存信息</el-menu-item>
      </el-submenu>
      <el-submenu index="/borrow">
        <template slot="title">
          <i class="el-icon-s-claim"></i>
          <span>借出记录管理</span>
        </template>
          <el-menu-item index="/borrow/borrowReturn">借出信息</el-menu-item>
          <el-menu-item index="/borrow/lostReport">挂失信息</el-menu-item>
      </el-submenu>
<!--      <el-submenu index="/setting">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-s-tools"></i>-->
<!--          <span>系统设置</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/setting/menu">菜单设置</el-menu-item>-->
<!--          <el-menu-item index="/setting/role">角色设置</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
    </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
    }
  },
  computed: {
    collapse () {
      return this.$store.state.sideBarCollapse
    }
  }
}
</script>

<style scoped>
.el-menu /deep/{
  border-right:none;
}
.el-submenu .el-menu-item /deep/{
  padding-left: 60px !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo /deep/{
  width: 200px;
}
</style>
