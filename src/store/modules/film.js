// 需要调用 ajax 。那么引入封装好的 网络请求工具模块
import request from '../../utils/request'
// import { Toast } from 'vant'

export default {
  namespaced: true,

  state: {
    bannerList: [], // 热门影片轮播图数据
    filmList: [], // 影片列表数据
    total: 1 // 一共有多少条数据
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
      // 第一种方式 做拼接
      // state.filmList = state.filmList.concat(payload.films)
      // 第二中方式 做push ...
      // if (payload.needClear) {
      //   // 需要清空，做替换
      //   state.filmList = payload.films
      // } else {
      //   // 不需要清空，做追加
      //   state.filmList.push(...payload.films)
      // }

      // state.filmList.push(...payload.films)
      state.filmList = payload.films
      state.total = payload.total
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
    getFilmList({ commit, state }, payload) {
      setTimeout(() => {
        request
          .get('/gateway', {
            params: {
              cityId: 440300,
              pageNum: payload.pageNum,
              pageSize: payload.pageSize,
              type: payload.filmType === 0 ? 1 : 2,
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
                films: state.filmList.concat(res.data.films),
                total: res.data.total
              })

              // 调用哪个回调函数即可
              payload.callback()
            }
          })
      }, 1500)
    }
  }
}
