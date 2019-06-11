export default {
  state: {
    loading: false,
    error: null,
    info: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setInfo (state, payload) {
      state.info = payload
    },
    clearInfo (state) {
      state.info = null
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },

    setError ({commit}, payload) {
      commit('setError', payload)
    },
    setInfo ({commit}, payload) {
      commit('setInfo', payload)
    },
    clearError ({commit}) {
      commit('clearError')
    },
    clearInfo ({commit}) {
      commit('clearInfo')
    }

  },
  getters: {
    getLoading (state) {
      return state.loading
    },
    getError (state) {
      return state.error
    },
    getInfo (state) {
      return state.info
    }
  }
}
