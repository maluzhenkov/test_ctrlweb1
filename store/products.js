const API_URL = 'https://60896cd98c8043001757ec69.mockapi.io'

export const state = () => ({
  selectedCategory: null,
  categories: [],
  productList: [],
})

export const getters = {
  favoriteAmount(state) {
    return state.productList.reduce((acc, item) => {
      if (item.favorite) {
        acc++
      }
      return acc
    }, 0)
  },
}

export const mutations = {
  SET_CATEGORIES(state, payload) {
    const nest = (items, id = null, link = 'parent') => {
      return items
        .filter((item) => item[link] === id)
        .map((item) => ({ ...item, children: nest(items, item.id) }))
    }
    state.categories = nest(payload)
  },
  SET_PRODUCT(state, payload) {
    state.productList = payload
  },
  UPDATE_FAVORITE(state, id) {
    const idx = state.productList.findIndex((item) => item.id === id)
    state.productList[idx].favorite = !state.productList[idx].favorite
  },
  UPDATE_SALE(state, id) {
    const idx = state.productList.findIndex((item) => item.id === id)
    state.productList[idx].on_sale = !state.productList[idx].on_sale
  },
  SELECT_CATEGORY(state, payload) {
    state.selectedCategory = payload
  },
  RESET_SELECTED_CATEGORY(state) {
    state.selectedCategory = null
  },
}

export const actions = {
  selectCategory({ commit }, payload) {
    commit('SELECT_CATEGORY', payload)
  },
  updateSale({ commit }, id) {
    commit('UPDATE_SALE', id)
  },
  // Список продуктов
  async getProducts({ commit }) {
    const data = await this.$axios.$get(`${API_URL}/products`)

    commit('SET_PRODUCT', data)

    return data
  },
  // Список категорий
  async getCategories({ commit }) {
    const data = await this.$axios.$get(`${API_URL}/sections`)

    commit('SET_CATEGORIES', data)

    return data
  },
}
