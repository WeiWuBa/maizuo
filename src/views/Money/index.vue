<template>
  <!--
    钱包页面
  -->
  <div class="page-money">
    <h1>钱包</h1>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'Money',

  created() {
    request.post('/api/getMoney').then(res => {
      console.log(res)
    })
  }
}
</script>
