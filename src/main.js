// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import CartPreview from '@/components/cart/CartPreview'
import Axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'


//Vue.use(VueLocalStorage)

//import './../node_modules/bulma/css/bulma.css'



Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.component('app-cart-preview', CartPreview)

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import './css/swiper.css'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.use(Vuetify)

//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
