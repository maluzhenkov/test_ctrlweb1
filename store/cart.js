export const state = () => ({
  cart: [],
})

export const getters = {
  getSumProductInCart(state) {
    return state.cart.reduce((acc, item) => {
      acc += item.price
      return acc
    }, 0)
  },
  getAmountProductInCart(state) {
    return state.cart.length
  },
}

export const mutations = {
  UPDATE_CART(state, payload) {
    const idx = state.cart.findIndex((item) => item.id === payload.id)
    if (idx !== -1) {
      state.cart.splice(idx, 1)
      return
    }
    state.cart.push(payload)
  },
}

export const actions = {
  updateCart({ commit, dispatch }, payload) {
    commit('UPDATE_CART', payload)
    dispatch('products/updateSale', payload.id, { root: true })
  },
}
