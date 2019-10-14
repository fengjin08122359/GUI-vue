import '@babel/polyfill'
import promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import BackCol from './components/backCol/BackCol'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css';
import 'font-awesome/css/font-awesome.min.css';
import 'animate.css';
import './assets/css/index.css'
import 'swiper/dist/css/swiper.css'
promise.polyfill()
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper)
Vue.component('BackCol', BackCol);
new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    this.$router.push('/')
  }
}).$mount('#app')
