<template>
  <div class="film-list">
    <ul class="film-list__ul">
      <li class="film-list__item" v-for="item in films" :key="item.filmId">
        <a href="#">
          <div class="film-img">
            <img :src="item.poster" alt />
          </div>
          <div class="film-info">
            <p class="film-info-title">{{ item.name }}</p>
            <p
              class="film-info-grade"
              :style="{visibility: item.grade ? '' : 'hidden' }"
            >观众评分 {{ item.grade }}</p>
            <p class="film-info-actors">主演：{{ item.actors | formatActors('1') }}</p>
            <p class="film-info-detail">美国 xxx | 133分钟</p>
          </div>
          <div class="film-btn">
            <button v-if="filmType === 'nowPlaying'">购票</button>
            <button v-else>预购</button>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilmList',

  props: {
    films: Array,
    filmType: {
      type: String,

      validator(value) {
        return ['nowPlaying', 'comingSoon'].indexOf(value) > -1
      }
    }
  },

  // 过滤器选项
  filters: {
    // key: value  key -> 过滤器名字  value -> 过滤器的处理函数,处理函数接收一个参数，参数的值是 调用 这个过滤器时 | 前面的数据的值。函数并且要返回内容。
    formatActors: function(value = []) {
      // console.log(value) [{name: 'xxx'}, {name: 'aaaa'}]
      // xxx aaa xxx yyy
      // 0. 默认值
      // let value = value || []
      // 1. 取出主演数组中的某个name数据，生成一个新的数组
      let arr = value.map(item => item.name) // ['zhangsan', 'lisi']
      // 2. 再将 数组拼接成 字符串
      let str = arr.join(' ')
      // 3. 返回
      return str
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/common/mixin.scss';

.film-list {
  .film-list__ul {
    margin-left: 15px;
  }

  .film-list__item {
    @include border-bottom;
    height: 94px;
    padding: 15px 15px 15px 0;

    a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: #797d82;
    }
  }

  .film-img {
    width: 66px;

    img {
      width: 100%;
    }
  }

  .film-info {
    padding: 0 10px;
    flex: 1;
    overflow: hidden;
    line-height: 1.6;

    p {
      height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .film-info-title {
      height: 26px;
      font-size: 16px;
      color: #191a1b;
    }
  }

  .film-btn {
    height: 25px;
    button {
      width: 50px;
      height: 25px;
      border-radius: 2px;
      border: 1px solid #ff5f16;
      color: #ff5f16;
      background: none;
    }
  }
}
</style>
