import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Tab, Tabs, List, Cell } from 'vant'
import './assets/styles/base.scss'

// Vue.use(Toast) //Vue.prototype.$toast = Toast

Vue.config.productionTip = false

Vue.use(Tab)
  .use(Tabs)
  .use(List)
  .use(Cell)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
