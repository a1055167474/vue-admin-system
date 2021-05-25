import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home'
import Index from '../components/Index'
import Test from '../components/Test'
import Login from '../components/Login'
import Welcome from '../components/Welcome'
import BookInfo from '../components/BookInfo'
import MenuSetting from '../components/setting/MenuSetting'
import Role from '../components/setting/Role'
import BorrowReturn from '../components/BorrowReturn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      },
      redirect: '/welcome',
      children: [
        {
          path: 'index',
          name: 'Index',
          component: Index
        },

        {
          path: 'test',
          name: 'Test',
          component: Test
        },

        {
          path: 'welcome',
          name: 'Welcome',
          component: Welcome
          // meta: {
          //   requireAuth: true
          // }
        },
        {
          path: 'hello',
          name: 'Hello',
          component: HelloWorld
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ts',
      component: Home,
      children: [
        {
          path: 'tt',
          name: 'BookInfo',
          component: BookInfo
        }
      ]
    },
    {
      path: '/setting',
      component: Home,
      children: [
        {
          path: 'menu',
          name: 'MenuSetting',
          component: MenuSetting
        },
        {
          path: 'role',
          name: 'Role',
          component: Role
        }
      ]
    },
    {
      path: '/borrow',
      component: Home,
      children: [
        {
          path: 'borrowReturn',
          name: 'BorrowReturn',
          component: BorrowReturn
        },
        {
          path: 'role',
          name: 'Role',
          component: Role
        }
      ]
    }
  ]
})
