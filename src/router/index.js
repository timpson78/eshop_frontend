import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Catalog from '@/components/catalog/Catalog'
import Cart from '@/components/cart/Cart'
import Item from '@/components/catalog/Item'
import Login from '@/components/auth/Login'
import Registration from '@/components/auth/Registration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/item/:id',
      props: true,
      name: 'item',
      component: Item
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    }
  ],
  mode: 'history' // without # in browser
})
