import Vue from 'vue'
import router from './router'

import App from './App.vue'
import Card from 'components/Card.vue'
import ListCard from 'components/ListCard.vue'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import 'assets/scss/style.scss'
import 'assets/iconfont/iconfont.css'


Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

Vue.component('m-card',Card)
Vue.component('m-list-card',ListCard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
