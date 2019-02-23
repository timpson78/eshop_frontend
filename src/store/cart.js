
export default {
  state: {
    carts: [],
    idCartItems: []
  },
  mutations: {
    setCarts (state, payload) {
      state.carts = payload
    },
    setQuantityCartById (state, payload) {
      let cartIndex = state.carts.findIndex(cart => cart.item.id === payload.item.id)
      state.carts[cartIndex].quantity = payload.quantity
    },
    addCart (state, payload) {
      state.carts.push(payload)
      state.idCartItems.push(payload.item.id)
    },
    deleteCart (state, payload) {
      const cartIndex = state.carts.findIndex(cart => cart.item.id === payload)
      state.carts.splice(cartIndex, 1)
      state.idCartItems.splice(cartIndex, 1)
    },
    clearCarts (state) {
      state.carts = []
      state.idCartItems = []
    }

  },
  actions: {},
  getters: {
    getCarts (state) {
      return state.carts
    },
    getCartSize (state) {
      return state.carts.length
    },
    getCartById (state) {
      return id => {
        return state.carts.find(cart => cart.item.id === id)
      }
    },
    isItemInCart (state) {
      return id => {
        return state.idCartItems.find(idItem => idItem === id) !== undefined
      }
    }
  }

}
