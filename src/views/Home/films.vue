<template>
  <!-- 影片列表页 -->
  <div class="page-home-films">
    <!-- 轮播图 -->
    <Banner ref="myBanner" :imgs="bannerListImgs" v-if="bannerListImgs.length > 0" />

    <!-- Tab 标签页 -->
    <van-tabs v-model="active" sticky :class="{'z-fixed': isFixed}">
      <van-tab title="正在热映">
        <FilmList />
      </van-tab>
      <van-tab title="即将上映">内容2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Banner from '../../components/Banner'
import FilmList from '../../components/FilmList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Films',

  components: {
    Banner,
    FilmList
  },

  computed: {
    ...mapGetters('film', ['bannerListImgs'])
  },

  data () {
    return {
      isFixed: false,
      active: 0
    }
  },

  methods: {
    ...mapActions('film', ['getBannerList']),
    bindScroll () {
      console.log('影片列表在滚动')
      // console.log(this.$el.scrollTop)
      if (this.$el.scrollTop >= 210) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },

  created () {
    // this.$toast('hello')
    this.getBannerList()
  },

  mounted () {
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
