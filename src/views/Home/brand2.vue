<template>
  <!-- 京东分类页 -->
  <div class="page-home-brand">
    <ul class="left">
      <li :class="{'active': '' === curBrandId}" @click="fn1('')">推荐</li>
      <li
        v-for="item in brands"
        :key="item.id"
        :class="{'active': item.id === curBrandId}"
        @click="fn1(item.id)"
      >{{ item.name }}</li>
    </ul>
    <ul class="right" ref="myRight">
      <li v-for="item in phones" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import request from '../../utils/request'
import { Toast } from 'vant'

export default {
  name: 'Brand',

  data() {
    return {
      brands: [],
      phones: [],
      curBrandId: '' // 选择的品牌id
    }
  },

  methods: {
    /**
     * 获取品牌列表
     */
    getBrand() {
      request
        .get('http://localhost:8080/api/portal-api/product/category-brands/1')
        .then(res => {
          if (res.code === 0) {
            this.brands = res.data
          }
        })
    },
    /**
     * 根据品牌获取手机数据
     */
    getPhone() {
      // 1. 请求之前，先转圈
      Toast.loading({ duration: 0 })
      request
        .post('http://localhost:8080/api/portal-api/product/search', {
          brandId: this.curBrandId,
          categoryId: 1,
          isRecommend: this.curBrandId === '' ? true : false,
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
        })
    },

    fn1(id) {
      if (this.curBrandId === id) {
        return
      }
      // 设置当前选择的品牌id
      this.curBrandId = id
      // 清空
      this.phones = []
      // 获取数据
      this.getPhone()
    }
  },

  created() {
    this.getBrand()
    this.getPhone()
  }
}
</script>

<style lang="scss">
.page-home-brand {
  display: flex;

  .left {
    width: 80px;
    overflow-y: auto;

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
    overflow-y: auto;

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
