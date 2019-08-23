<template>
  <div class="page-home-cinemas">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="num in pageTotal" :key="num">
          <div class="list">
            <div
              class="item"
              v-for="item in list.slice( (num - 1) * pageSize, pageSize * num )"
              :key="item.articleId"
            >
              <img :src="item.articleImg" alt />
              <div>
                <p class="title">{{ item.title }}</p>
                <!-- <p class="desc" v-html="item.content"></p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import request from '../../utils/request'

export default {
  name: 'Cinemas',

  data () {
    return {
      list: [],
      pageSize: 2
    }
  },

  computed: {
    pageTotal () {
      return Math.ceil(this.list.length / this.pageSize)
    }
  },

  methods: {
    getList () {
      request.get('http://localhost:3000/article').then(res => {
        this.list = res

        this.$nextTick(() => {
          /* eslint-disable-next-line */
          new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      })
    }
  },

  created () {
    this.getList()
  }
}
</script>

<style lang="scss">
.page-home-cinemas {
  .swiper-container {
    height: 200px;
  }

  .list {
    display: flex;
    flex-direction: column;
    height: 200px;
  }

  .item {
    flex: 1;
    display: flex;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    > div {
      flex: 1;
    }
  }
}
</style>
