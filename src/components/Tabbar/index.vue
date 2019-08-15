<template>
  <ul class="mz-tabbar">
    <li v-for="tab in tabs" :key="tab.id">
      <router-link :to="tab.href">
        <i class="iconfont" :class="[tab.icon]"></i>
        <span>{{ tab.name }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Tabbar',

  props: {
    tabs: Array
  }
}
</script>

<style lang="scss">
// css 中使用 @ 别名，需要在前面加上一个 ~ 号
@import '~@/assets/styles/common/mixin.scss';

.mz-tabbar {
  @include border-top;
  display: flex;
  height: 50px;
  box-sizing: border-box;

  li {
    flex: 1;
  }

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: #797d82;

    &.router-link-active {
      color: #ff5f16;
    }
  }

  .iconfont {
    font-size: 22px;
  }
}
</style>
