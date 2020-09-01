import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/one',
    component: () => import(/* webpackChunkName: "Home" */'../views/Home.vue'),
    children: [
      {
        path: '/one',
        name: 'pageone',
        component: () => import(/* webpackChunkName: "pageOne" */'../views/pageOne')
      },
      {
        path: '/two',
        name: 'pagetwo',
        component: () => import(/* webpackChunkName: "pageTwo" */'../views/pageTwo')
      },
      {
        path: '/three',
        name: 'pagethree',
        component: () => import(/* webpackChunkName: "pageThree" */'../views/pageThree')
      },
      {
        path: '/four',
        name: 'pagefour',
        component: () => import(/* webpackChunkName: "fourpage" */'../views/fourpage')
      },
      {
        path: '/shanlan',
        name: 'shanlan',
        component: () => import(/* webpackChunkName: "shanlan" */'../views/shanlan')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */'../views/login')
      },
      {
        path: '/table',
        name: 'table',
        meta: { keepAlive: true, isBack: false },
        component: () => import(/* webpackChunkName: "table" */'../views/table')
      },
      {
        path: '/detail',
        name: 'detail',
        meta: { keepAlive: false },
        component: () => import(/* webpackChunkName: "detail" */'../views/detail')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */'../views/About.vue')
  },
  {
    path: '*',
    name: 'disablePage',
    component: () => import('../views/404')
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// Vue.mixin({
//   beforeRouteLeave: function (to, from, next) {
//     // 默认是缓存的 在来清除
//     // 1.用tag标记控制 判断上下级
//     // if (from && from.meta.tag && to.meta.tag && (from.meta.tag-to.meta.tag<1))
//     // 2.直接用组件名字来写 不够通用
//     // if (from.path == '/docMng' && to.path == '/docMng/docDetail') {
//     // 3. 用包含关系来判断 通用
//     console.log(to, from, '=========')
//     if (to.path.indexOf('detail') !== -1 && from.name == 'table') {
//       from.meta.keepAlive = true
//     } else {
//       // if (from && from.meta.tag && to.meta.tag && (from.meta.tag-to.meta.tag<1)){
//       if (this.$vnode && this.$vnode.data.keepAlive && from.name == 'table' && to.path.indexOf('home') != -1) {
//         if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
//           if (this.$vnode.componentOptions) {
//             var key = this.$vnode.key == null ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '') : this.$vnode.key
//             var cache = this.$vnode.parent.componentInstance.cache
//             var keys = this.$vnode.parent.componentInstance.keys
//             if (cache[key]) {
//               if (keys.length) {
//                 var index = keys.indexOf(key)
//                 if (index > -1) {
//                   keys.splice(index, 1)
//                 }
//               }
//               delete cache[key]
//             }
//           }
//         }
//         from.meta.keepAlive = true
//       }
//       // this.$destroy()
//     }
//     next()
//   }
// })

export default router

// const routeOptions = [
//   {
//     path:'/login',
//     name:'login',
//   },
//   {
//     path:'/index',
//     name:'index',
//   },
//   {
//     path:'/detail',
//     name:'detail',
//   },
// ]

// const routes = routeOptions.map(route => {
//   if (!route.component) {
//     route = {
//       ...route,
//       component: () => import(`@/views/${route.name}.vue`)
//     }
//   }
//   return route
// })

// let router = new Router({
//   routes
// })
