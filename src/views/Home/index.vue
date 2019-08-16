<template>
  <!--
    home 这个一级路由页面组件
  -->
  <div class="page-home">
    <router-view />

    <Tabbar :tabs="tabs" />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar/index.vue'

export default {
  name: 'Home',

  components: {
    Tabbar
  },

  data() {
    return {
      tabs: [
        { id: 1, name: '影片', icon: 'icon-films', href: '/films' },
        { id: 2, name: '影院', icon: 'icon-cinemas', href: '/cinemas' },
        { id: 3, name: '分类', icon: 'icon-sales', href: '/brand/' },
        { id: 4, name: '我的', icon: 'icon-center', href: '/center' }
      ]
    }
  }
}
</script>

<style lang="scss">
.page-home {
  display: flex;
  flex-direction: column;
  height: 100%;

  > div:first-child {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
