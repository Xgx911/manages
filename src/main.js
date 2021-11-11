import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import scroll from 'vue-seamless-scroll'
import bus from '@/server/bus'
import 'echarts-liquidfill'
import echarts from 'echarts'
// import LazyLoad from './components/lazyload/index'
Vue.config.productionTip = false

Vue.use(scroll)
console.log(echarts,'全局echarts'  )
Vue.prototype.$echarts = echarts
Vue.prototype.$bus = bus

// Vue.use(LazyLoad, {
//   default: 'https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyof9vr4mj3044032dfl.jpg'
// })

console.log(![] == [])
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (token && to.name == 'Home') {
//     next()
//   } else {
//     next({ name: 'Home' })
//   }
// })

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
