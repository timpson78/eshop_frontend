import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/components/Home'
import Catalog from '@/components/catalog/Catalog'
import Cart from '@/components/cart/Cart'
import Item from '@/components/catalog/Item'
import Login from '@/components/auth/Login'
import Registration from '@/components/auth/Registration'
import Cabinet from '@/components/cabinet/Cabinet'

Vue.use(Router)

const router = new Router({
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
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: Cabinet,
      meta: {
        requiresAuth: true
      }
    }

  ],
  mode: 'history' // without # in browser
})
export default router

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isUserLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
