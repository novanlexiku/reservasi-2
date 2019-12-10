import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: require('@/data/articles.json'),

  },
  getters: {
    // Filter data yang akan di load
    loadedRooms (state){
      return state.rooms.filter(room =>{
        return room.status === 'available'
      })
    },
    // Data di load per id
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
