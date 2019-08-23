// 1. 引入 Vue
import Vue from 'vue'

import store from './store'

// 2. 引入 VueRouter
import VueRouter from 'vue-router'

// 3. 调用 VueRouter
Vue.use(VueRouter)

// 4. 定义路由规则
const routes = [
  {
    path: '/',
    component: () => import('./views/Home/index.vue'),
    children: [
      {
        path: 'films',
        component: () => import('./views/Home/films.vue')
      },
      {
        path: 'cinemas',
        component: () => import('./views/Home/cinemas.vue')
      },
      {
        // 动态路由参数，后面加一个 ？ ,表示参数可以不用传递
        path: 'brand/:brandId?',
        name: 'brand',
        component: () => import('./views/Home/brand.vue')
      },
      {
        path: 'center',
        component: () => import('./views/Home/center.vue')
      },
      {
        path: '',
        redirect: '/films'
      }
    ]
  },
  {
    path: '/film/:filmId',
    component: () => import('./views/Film/index.vue')
  },
  {
    path: '/city',
    component: () => import('./views/City/index.vue')
  },
  {
    path: '/login',
    component: () => import('./views/Login/index.vue')
  },
  {
    path: '/money',
    component: () => import('./views/Money/index.vue'),
    meta: {
      needLogin: true
    }
  }
]

// 5. 创建 路由实例对象
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 判断将要去的路由是否需要登录状态
  if (to.meta.needLogin) {
    // 登录状态的校验
    if (store.state.user.userInfo) {
      // 放行
      next()
    } else {
      // 不存在，去登录
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

// 6. 暴露
export default router
