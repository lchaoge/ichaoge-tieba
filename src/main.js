// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import {routes} from './router/index'
Vue.use(VueRouter)

import UrlMapping from './assets/js/UrlMapping'
Vue.prototype.$Urls = new UrlMapping()

import Axios from './assets/js/Axios'
Vue.prototype.$Axios = Axios

import Apis from './assets/js/Apis'
Vue.prototype.$Apis = new Apis()

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
  template: '<App/>'
})
