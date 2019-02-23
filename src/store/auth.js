import Vue from 'vue'
import config from '@/config/config.js'

export default {
  state: {
    tokenType: '',
    token: localStorage.getItem('token') || '',
    user: null

  },
  mutations: {
    auth_save (state, tokenType, token, user) {
      state.token = token
      state.tokenType = tokenType
      state.user = user
    },
    set_user(state, payload){
      state.user = payload
      console.log(state)
    }

  },
  actions: {

    login ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('clearError')
        commit('setLoading', true)

        Vue.prototype.$http({url: config.API_URL+'/auth/signin',
          data: user,
          method: 'POST',
          headers: {'Content-Type': 'application/json'}})
              .then(resp => {
                  const token = resp.data.accessToken
                  const tokenType = resp.data.tokenType
                 // const user = resp.data.user
                  commit('auth_save',tokenType,token,user)

                  localStorage.setItem('token', token)

                  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
                  // commit('auth_success', token, user)

                  commit('setLoading', false)
                  resolve(resp)
              })
              .catch(err => {
                  commit('setLoading', false)
                  commit('setError',err.response.data.message)
                  reject(err)
              })

      })
    }

  },
  getters: {
    isUserLoggedIn (state) {
      return state.user !== null
    }

  }
}
