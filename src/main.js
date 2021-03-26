// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import './assets/common.css'

Vue.config.productionTip = false
Vue.use(Element)

router.beforeEach((to, from, next) => {
  nprogress.start()
  if (to.meta.requireAuth) {
    if (store.state.userinfo && store.state.isLogin) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  nprogress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
