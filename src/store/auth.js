import Vue from 'vue'
import config from '@/config/config.js'

export default {
  state: {
    tokenType: '',
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  mutations: {
    auth_save (state, payload) {
      state.token = payload.token
      state.tokenType = payload.tokenType
      state.user = payload.user
    },
    set_user (state, payload) {
      state.user = payload
    }

  },
  actions: {

    login ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('clearError')
        commit('setLoading', true)

        Vue.prototype.$http({url: config.API_URL + '/auth/signin',
          data: user,
          method: 'POST',
          headers: {'Content-Type': 'application/json'}})
              .then(resp => {
                const token = resp.data.accessToken
                let tokenType = resp.data.tokenType
                let myUser = {userId: resp.data.userId, role: resp.data.role, email: user.email, password: user.password}
                 // const user = resp.data.user
                commit('auth_save', {tokenType: tokenType, token: token, user: myUser})

                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(myUser))

                Vue.prototype.$http.defaults.headers.common['Authorization'] = token
                  // commit('auth_success', token, user)
                commit('setLoading', false)
                resolve(resp)
              })
              .catch(err => {
                commit('setLoading', false)
                commit('setError', err.response.data.message)
                reject(err)
              })
      })
    }

  },
  getters: {
    isUserLoggedIn (state) {
      return state.user !== null
    },
    getUser (state) {
      return state.user
    }
  }
}
