<template>
    <el-menu style="height: 100%"
             :default-active="$route.path"
             class="el-menu-vertical-demo"
             unique-opened
             :collapse="collapse"
             :collapse-transition="false"
             router>
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>设置</span>
        </template>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/test">test</el-menu-item>
      </el-submenu>
      <el-submenu index="/ts">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/ts/tt">test2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/setting">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/setting/menu">菜单设置</el-menu-item>
          <el-menu-item index="/setting/role">角色设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>
