import request from '../../utils/request'
import router from '../../router'
import { Toast } from 'vant'

let userInfo = localStorage.getItem('userInfo')
let token = localStorage.getItem('token')

export default {
  namespaced: true,

  state: {
    userInfo: userInfo ? JSON.parse(userInfo) : null, // 当前登录的用户信息对象
    token: token || null
  },

  getters: {},

  mutations: {
    login(state, payload) {
      state.userInfo = payload.userInfo
      state.token = payload.token
    }
  },

  actions: {
    /**
     * 登录
     */
    handleLogin({ commit }, payload) {
      request.post('http://localhost:8080/api/sign-in', payload).then(res => {
        console.log(res)
        if (res.code === 0) {
          // 登录成功 存储到仓库
          commit('login', res.data)

          // 存储到本地
          localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
          localStorage.setItem('token', res.data.token)

          // 跳转页面， 默认跳转到 个人中心页
          let redirect = router.currentRoute.query.redirect || '/center'
          router.replace(redirect)
        } else {
          // 登录失败
          Toast(res.msg)
        }
      })
    }
  }
}
