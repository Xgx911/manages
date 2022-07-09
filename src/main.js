import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import scroll from 'vue-seamless-scroll'
import bus from '@/server/bus'
import 'echarts-liquidfill'
import echarts from 'echarts'
import SuperFlow from 'vue-super-flow'
import 'vue-super-flow/lib/index.css'
import  element from 'element-ui'
// import LazyLoad from './components/lazyload/index'
Vue.config.productionTip = false
Vue.use(elementUi)

Vue.use(scroll)
Vue.use(element)
console.log(echarts,'全局echarts'  )
Vue.prototype.$echarts = echarts
Vue.prototype.$bus = bus
Vue.use(SuperFlow)
// Vue.use(LazyLoad, {
//   default: 'https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyof9vr4mj3044032dfl.jpg'
// })

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
