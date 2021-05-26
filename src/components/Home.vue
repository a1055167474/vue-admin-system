<template>
  <el-container class="container">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
<!--      <el-aside >-->
<!--        -->
<!--      </el-aside>-->
      <Aside class="aside"></Aside>
      <el-main class="main">
<!--        <tagsView></tagsView>-->
        <AppMain></AppMain>
<!--        <router-view :key="$route.path" />-->
      </el-main>
    </el-container>
<!--    <el-footer>footer</el-footer>-->
  </el-container>
</template>

<script>
import Aside from './Aside'
import AppMain from './AppMain'
import Header from './Header'
import TagsView from './tagsView/TagsView'

export default {
  name: 'Home',
  components: {Aside, AppMain, Header, TagsView}
}
</script>

<style scoped>
.container{
  height: 100vh;
  overflow: hidden;
}
.aside{
  height: calc(100vh - 60px);
  border-right: 1px solid #e6e6e6 !important;
}
.main{
  height: calc(100vh - 60px);
  padding: 0 !important;
}
.aside::-webkit-scrollbar{
  display: none;
}
.el-header /deep/{
  padding:0;
  border-bottom: 1px solid #e6e6e6 !important;
}
.el-footer /deep/{
  border-top: 1px solid #e6e6e6 !important;
}
</style>
