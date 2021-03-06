import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import admin from '../views/admin.vue'
import error404 from '../views/error404.vue'
import * as activity from '../views/activity'
import * as user from '../views/user'
import * as group from '../views/group'
import store from './store'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: home
    },
    // 用户相关
    {
      path: '/my',
      name: 'my',
      component: user.show,
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          return next()
        }
        return next('login')
      },
      props: () => ({
        id: store.state.profile.id
      })
    },
    {
      path: '/users',
      component: user.list
    },
    {
      path: '/users/show/:id',
      component: user.show,
      props: true
    },
    {
      path: '/users/create',
      component: user.create
    },
    // 班级
    {
      path: '/groups',
      component: group.list
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          return next(false)
        }
        return next()
      }
    },
    // 管理（制作中）
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    // 活动相关
    {
      path: '/activities',
      name: 'activities',
      component: activity.list
    },
    {
      path: '/activities/create',
      component: activity.create
    },
    {
      path: '/activities/show/:id',
      component: activity.show,
      props: true
    },
    // 404
    {
      path: '*',
      name: 'error404',
      component: error404
    }
  ]
})
