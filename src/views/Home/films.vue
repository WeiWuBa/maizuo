<template>
  <!-- 影片列表页 -->
  <div class="page-home-films">
    <!-- 轮播图 -->
    <Banner :imgs="bannerListImgs" v-if="bannerListImgs.length > 0" />
  </div>
</template>

<script>
import Banner from '../../components/Banner'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Films',

  components: {
    Banner
  },

  computed: {
    ...mapGetters('film', ['bannerListImgs'])
  },

  methods: {
    ...mapActions('film', ['getBannerList'])
  },

  created() {
    this.getBannerList()
  }
}
</script>
