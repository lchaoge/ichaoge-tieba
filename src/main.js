// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './store/index'

import VueRouter from 'vue-router'
import {routes} from './router/index'
Vue.use(VueRouter)

// 自己封装插件
import UrlMapping from './assets/js/UrlMapping'
Vue.prototype.$Urls = new UrlMapping()
import Axios from './assets/js/Axios'
Vue.prototype.$Axios = Axios
import Apis from './assets/js/Apis'
Vue.prototype.$Apis = new Apis()

// 专门用作单一事件管理而初始化的全局Vue对象
window.vueEvent = new Vue(); 
window.that = Vue

// 引用vux插件
import  { ConfirmPlugin,AlertPlugin,LoadingPlugin,ToastPlugin,ConfigPlugin  } from 'vux'
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})


let router = new VueRouter({
	mode:'history',
	routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  template: '<App/>'
})
