<template>
  <!--
    城市选择 一级路由页面组件
  -->
  <div class="page-city">
    <van-nav-bar title="当前城市" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-search placeholder="请输入搜索关键词" v-model="value" />

    <div class="page-city__body">
      <div class="left" ref="myBox">
        <div class="city-box">
          <p class="city-box__title">热门城市</p>
          <ul>
            <li class="city-box__item">北京</li>
            <li class="city-box__item">北京</li>
            <li class="city-box__item">北京</li>
            <li class="city-box__item">北京</li>
          </ul>
        </div>

        <ul class="city-list">
          <li
            :ref="'item-' + item.py"
            class="city-list__item"
            v-for="item in cityList"
            :key="item.py"
          >
            <p class="item-title">{{ item.py }}</p>
            <ul>
              <li v-for="city in item.list" :key="city.cityId">{{ city.name }}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li v-for="item in pys" :key="item" @click="fn1(item)">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'City',

  data() {
    return {
      value: ''
    }
  },

  computed: {
    ...mapGetters('city', ['cityList', 'pys'])
  },

  methods: {
    ...mapActions('city', ['getCities']),
    /**
     * 点击后退
     */
    onClickLeft() {
      this.$router.back()
    },

    fn1(py) {
      // 1. 我得知道我点击的是个啥
      let itemBox = this.$refs[`item-${py}`][0]
      // 2. 算出 itemBox 距离顶部的高度
      let offsetTop = itemBox.offsetTop - 100
      // 3. 控制那个可滚动div的 scrollTop
      this.$refs['myBox'].scrollTop = offsetTop
    }
  },

  created() {
    this.getCities()
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/common/mixin.scss';

.page-city {
  display: flex;
  flex-direction: column;
  height: 100%;

  .page-city__body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .left {
    flex: 1;
    overflow-y: auto;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;

    ul {
      width: 100%;

      li {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        text-align: center;
      }
    }
  }

  .city-box {
    padding: 10px;
    &__title {
      font-size: 14px;
      color: #ccc;
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 2px;
        background: #f4f4f4;
        margin: 10px 5px;
      }
    }
  }

  .city-list__item {
    .item-title {
      background-color: #f4f4f4;
      color: #797d82;
      padding: 0 0 0 15px;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
    }
    ul {
      padding-left: 20px;
    }
    li {
      @include border-bottom;
      height: 48px;
      line-height: 48px;
      width: 100%;
      color: #191a1b;
      &:last-child::after {
        height: 0;
      }
    }
  }
}
</style>
