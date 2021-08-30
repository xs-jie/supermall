import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//全局导入vant 插件
import Vant from 'vant';
import 'vant/lib/index.css';

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
//全局使用Vant
Vue.use(Vant)


Vue.config.productionTip = false

//在vue原型添加$bus作为事件总线，vue实例可以作为传递事件
Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyload, {
  loading: require('assets/img/占位.jpg')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
