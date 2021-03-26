import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home'
import Index from '../components/Index'
import Test from '../components/Test'
import Login from '../components/Login'
import Test2 from '../components/Test2'
import MenuSetting from '../components/setting/MenuSetting'
import Role from '../components/setting/Role'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
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
          name: 'Test2',
          component: Test2
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
    }
  ]
})
