// 需要调用 ajax 。那么引入封装好的 网络请求工具模块
import request from '../../utils/request'

export default {
  namespaced: true,

  state: {
    bannerList: [] // 热门影片轮播图数据
  },

  getters: {
    bannerListImgs(state) {
      return state.bannerList.map(item => item.img)
    }
  },

  mutations: {
    setBannerList(state, payload) {
      state.bannerList = payload
    }
  },

  actions: {
    getBannerList({ commit }) {
      // axios.get('/banner') http://localhost:8080/banner
      request.get('/banner').then(data => {
        // console.log(data)
        // 请求成功，还需将后台返回的数据存放到 state 中
        commit('setBannerList', data)
      })
    }
  }
}
