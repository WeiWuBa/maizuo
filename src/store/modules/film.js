// 需要调用 ajax 。那么引入封装好的 网络请求工具模块
import request from '../../utils/request'
// import { Toast } from 'vant'

export default {
  namespaced: true,

  state: {
    bannerList: [], // 热门影片轮播图数据
    filmList: [] // 影片列表数据
  },

  getters: {
    bannerListImgs(state) {
      return state.bannerList.map(item => item.img)
    }
  },

  mutations: {
    setBannerList(state, payload) {
      state.bannerList = payload
    },
    setFilmList(state, payload) {
      state.filmList = payload.films
    }
  },

  actions: {
    /**
     * 获取轮播图的数据
     */
    getBannerList({ commit }) {
      // axios.get('/banner') http://localhost:8080/banner
      request.get('http://localhost:3000/banner').then(data => {
        // console.log(data)
        // 请求成功，还需将后台返回的数据存放到 state 中
        commit('setBannerList', data)
      })
    },

    /**
     * 获取影片列表数据
     */
    getFilmList({ commit }) {
      request
        .get('/gateway', {
          params: {
            cityId: 440300,
            pageNum: 1,
            pageSize: 10,
            type: 1,
            k: 2809619
          },
          headers: {
            'X-Client-Info':
              '{"a":"3000","ch":"1002","v":"5.0.4","e":"156584910960129542198"}',
            'X-Host': 'mall.film-ticket.film.list'
          }
        })
        .then(res => {
          if (res.status === 0) {
            commit({
              type: 'setFilmList',
              films: res.data.films
            })
          }
        })
    }
  }
}
