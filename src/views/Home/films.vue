<template>
  <!-- 影片列表页 -->
  <van-list :finished="finished" v-model="loading" finished-text="别拉拉" @load="loadFilmList">
    <div class="page-home-films">
      <!-- 轮播图 -->
      <Banner ref="myBanner" :imgs="bannerListImgs" v-if="bannerListImgs.length > 0" />

      <!-- Tab 标签页 -->
      <van-tabs v-model="filmType" sticky :class="{'z-fixed': isFixed}">
        <van-tab title="正在热映">
          <FilmList filmType="nowPlaying" :films="filmList" />
        </van-tab>
        <van-tab title="即将上映">
          <FilmList filmType="comingSoon" :films="filmList" />
        </van-tab>
      </van-tabs>
    </div>
  </van-list>
</template>

<script>
import Banner from '../../components/Banner'
import FilmList from '../../components/FilmList'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'

export default {
  name: 'Films',

  components: {
    Banner,
    FilmList
  },

  computed: {
    ...mapState('film', ['filmList', 'total']),
    ...mapGetters('film', ['bannerListImgs']),

    // 基于仓库中 total 数据与 本身的 pageSize 数据动态计算来的
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },

  data() {
    return {
      isFixed: false,
      finished: false, // 是否还有更多数据
      loading: false, // 是否正在请求数据
      pageNum: 0, // 当前的页码
      pageSize: 10, // 每页显示的条数
      filmType: 0 // 当前影片类型，0-正在热映 1-即将上映
    }
  },

  watch: {
    filmType(newVal, oldVal) {
      // 1. 将 pageNum 设置为 0
      this.pageNum = 0
      // 2. 将 finished 设置为 false
      this.finished = false
      // 3. 让滚动条置顶, list 组件的一个小坑，如果页面不进行操作，直接切换tab，会导致 @load 事件不触发。让他稍稍动一下就ok。
      this.$el.scrollTop = 1
      // 4. 直接先做清空
      this.setFilmList({
        films: [],
        total: this.total
      })
    }
  },

  methods: {
    ...mapMutations('film', ['setFilmList']),
    ...mapActions('film', ['getBannerList', 'getFilmList']),

    bindScroll() {
      console.log('影片列表在滚动')
      // console.log(this.$el.scrollTop)
      if (this.$el.scrollTop >= 210) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },

    // fn1(name, title) {
    //   console.log(name, title)
    // },

    /**
     * 加载更多的影片列表数据
     */
    loadFilmList() {
      console.log('123')
      // 1. 每次进入到这个方法的时候，都要讲 pageNum + 1
      this.pageNum++
      // 2. 调用 仓库中的 action 执行请求，并传递一些参数过去
      this.getFilmList({
        // 其他的参数
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        filmType: this.filmType,
        callback: () => {
          console.log('回调函数')
          this.loading = false

          // 最终判断是否还有下一页
          if (this.pageNum >= this.totalPage) {
            this.finished = true
          }
        }
      })
    }
  },

  created() {
    // this.$toast('hello')
    this.getBannerList()
    // this.getFilmList()
  },

  mounted() {
    // this.$el.addEventListener('scroll', this.bindScroll)
  }

  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.bindScroll)
  // }
}
</script>

<style lang="scss">
.z-fixed .van-tabs__wrap {
  position: fixed;
  z-index: 99999;
  width: 100%;
  top: 0;
}

.z-fixed .van-tabs__content {
  padding-top: 44px;
}
</style>
