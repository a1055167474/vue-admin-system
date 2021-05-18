import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: '',
    isLogin: false,
    sideBarCollapse: false,
    tagsView: [{
      path: '/index',
      name: '首页',
      meta: {
        affix: true
      }
    }, {
      path: '/test',
      name: '测试'
    }]
  },
  mutations: {
    set_userInfo (state, info) {
      console.log(info)
      state.userinfo = info
    },
    set_isLogin (state, is) {
      console.log(is)
      state.isLogin = is
    },
    logout (state) {
      state.userinfo = ''
      state.isLogin = false
    },
    switch_collapse (state) {
      state.sideBarCollapse = !state.sideBarCollapse
    },
    del_tagsView (state, tag) {
      for (const [i, v] of Object.entries(state.tagsView)) {
        if (v.path === tag.path) {
          state.tagsView.splice(i, 1)
          break
        }
      }
    }
  }
})
