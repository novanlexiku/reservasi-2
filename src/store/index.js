import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: require('@/data/articles.json'),

  },
  getters: {
    categories: state => {
      const categories = []

      for (const room of state.rooms) {
        if (
          !room.category ||
          categories.find(category => category.text === room.category)
        ) continue

        const text = room.category

        categories.push({
          text,
          to: `/category/${text}`
        })
      }

      return categories.sort().slice(0, 4)
    },
    links: (state, getters) => {
      return state.items.concat(getters.categories)
    },
    loadedRoom (state){
      return (roomID) => {
        return state.rooms.find((room) => {
          return room.id === roomID
        })
      }
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {

  },
  modules: {
  }
})
