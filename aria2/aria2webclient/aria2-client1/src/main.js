import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//导入全局样式表
import './assets/css/global.css'


Vue.use(ElementUI);
Vue.filter('fixed', function (input, length = 2) {
  return input.toFixed(length)
})



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
