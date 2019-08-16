<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgs" :key="index">
        <img :src="img" alt />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination" v-if="pagination"></div>

    <!-- 如果需要导航按钮 -->
    <template v-if="navigation">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </template>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'Banner',

  props: {
    imgs: Array, // 轮播图的数据 ['http://11.jpg', 'http://22.jpg']
    pagination: {
      type: Boolean,
      default: true
    }, // 是否需要分页器
    navigation: Boolean // 是否需要前进后退按钮
  },

  methods: {
    /**
     * 初始化 swiper
     */
    initSwiper () {
      new Swiper('.swiper-container', {
        pagination: this.pagination
          ? {
            el: '.swiper-pagination'
          }
          : {},

        navigation: this.navigation
          ? {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
          : {}
      })
    }
  },

  mounted () {
    this.initSwiper()
  }
  // updated() {
  //   this.initSwiper()
  // }
}
</script>

<style lang="scss">
.swiper-container {
  height: 210px;

  img {
    width: 100%;
  }
}
</style>
