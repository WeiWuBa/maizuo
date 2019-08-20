<template>
  <!-- 京东分类页 -->
  <div class="page-home-brand">
    <div class="left" ref="left">
      <ul>
        <li :class="{'active': !$route.params.brandId}" @click="fn1('')">推荐</li>
        <li
          v-for="item in brands"
          :key="item.id"
          :class="{'active': item.id === parseInt($route.params.brandId)}"
          @click="fn1(item.id)"
        >{{ item.name }}</li>
      </ul>
    </div>

    <div class="right" ref="myRight">
      <ul>
        <li v-for="item in phones" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
import { Toast } from 'vant'
import BScroll from 'better-scroll'

export default {
  name: 'Brand',

  data () {
    return {
      brands: [],
      phones: []
      // curBrandId: parseInt(this.$route.params.brandId) // 当前的品牌id
    }
  },

  watch: {
    $route: {
      handler (newVal) {
        this.getPhone()
      },
      immediate: true
    }
  },

  methods: {
    /**
     * 获取品牌列表
     */
    getBrand () {
      request
        .get('http://localhost:8080/api/portal-api/product/category-brands/1')
        .then(res => {
          if (res.code === 0) {
            this.brands = res.data
          }

          // 初始化
          /* eslint-disable-next-line */
          new BScroll(this.$refs['left'], {
            click: true
          })
        })
    },
    /**
     * 根据品牌获取手机数据
     */
    getPhone () {
      // 1. 请求之前，先转圈
      Toast.loading({ duration: 0 })
      request
        .post('http://localhost:8080/api/portal-api/product/search', {
          brandId: this.$route.params.brandId,
          categoryId: 1,
          isRecommend: this.$route.params.brandId === '',
          pageIndex: 0,
          pageSize: 20,
          refresh: true
        })
        .then(res => {
          if (res.code === 0) {
            this.phones = res.data
          }

          // 关闭提示
          Toast.clear()
          /* eslint-disable-next-line */
          new BScroll(this.$refs['myRight'])
        })
    },

    fn1 (id) {
      this.$router.replace(`/brand/${id}`)
      //   if (id) {
      //     this.$router.replace({
      //       name: 'brand',
      //       params: {
      //         brandId: id
      //       }
      //     })
      //   } else {
      //     this.$router.replace({
      //       path: '/brand'
      //     })
      //   }
    }
  },

  created () {
    this.getBrand()
    // this.getPhone()
  }
}
</script>

<style lang="scss">
.page-home-brand {
  display: flex;

  .left {
    width: 80px;

    li {
      position: relative;
      height: 56px;
      line-height: 56px;
      text-align: center;
      border-right: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      box-sizing: border-box;

      &.active {
        background: #f9faff;
        border: none;

        &::before {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          content: '';
          width: 6px;
          height: 100%;
          background: #f9e72c;
        }
      }
    }
  }

  .right {
    flex: 1;

    li {
      height: 56px;
      line-height: 56px;
      padding-left: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #e1e1e1;
    }
  }
}
</style>
