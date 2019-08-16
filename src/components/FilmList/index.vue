<template>
  <div class="film-list">
    <ul class="film-list__ul">
      <li class="film-list__item" v-for="item in 20">
        <a href="#">
          <div class="film-img">
            <img
              src="https://static.maizuo.com/pc/v5/usr/movie/97730d2c52fc77ef95598f501697ea2c.jpg?x-oss-process=image/quality,Q_70"
              alt
            />
          </div>
          <div class="film-info">
            <p class="film-info-title">速度与激情：特别行动</p>
            <p class="film-info-grade">观众评分 8.6</p>
            <p class="film-info-actors">主演：张三、李四、王五、</p>
            <p class="film-info-detail">美国 xxx | 133分钟</p>
          </div>
          <div class="film-btn">
            <button>购票</button>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilmList'
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
    line-height: 1.6;

    .film-info-title {
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
