<template>
  <div class="tags-view-container">
    <el-scrollbar :vertical="false" class="scroll-container">
      <router-link :class="isActive(tag)?'active':''"
                   v-for="tag in tagsView"
                   :key="tag.path"
                   :to="{path: tag.path}"
                   tag="span"
                   class="tags-view-item"
      >{{tag.name}}
        <span v-if="!isAffix(tag)" class="el-icon-close close" @click.prevent.stop="closeTag(tag)" />
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'TagsView',
  computed: {
    tagsView () {
      return this.$store.state.tagsView
    }
  },
  methods: {
    isActive (v) {
      return v.path === this.$route.path
    },
    isAffix (v) {
      return v.meta && v.meta.affix
    },
    closeTag (v) {
      console.log(v)
      this.$store.commit('del_tagsView', v)
    },
    toLastTag (v) {
      const lastTag = {}

    }
  }
}
</script>

<style scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
}
.tags-view-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
}
.tags-view-item:first-of-type {
  margin-left: 15px;
}
.tags-view-item:last-of-type {
  margin-right: 15px;
}
.tags-view-item.active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}
.tags-view-item.active::before {
  content: '';
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}
.tag{
  width: 100px;
  height: 40px;
  padding: 5px 7px;
  border: 1px solid #eee;
}
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.scroll-container /deep/.el-scrollbar__bar {
  bottom: 0;
}
.scroll-container /deep/ .el-scrollbar__wrap {
  height: 49px;
}
.tags-view-item .close {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: 2px;
  border-radius: 50%;
  text-align: center;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  transform-origin: 100% 50%;
}
.tags-view-item .close:before{
  transform: scale(.6);
  display: inline-block;
  vertical-align: -3px;
}
.tags-view-item .close:hover{
  background-color: #b4bccc;
  color: #fff;
}
</style>
