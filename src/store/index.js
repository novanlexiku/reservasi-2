import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: require('@/data/articles.json'),
    user: null
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
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    createRoom (state, payload){
      state.loadedRooms.push(payload)
    },
    setUser (state, payload){
      state.user = payload
    }
  },
  actions: {
    createRoom ({commit}, payload) {
      const room = {
        title: payload.title,
        harga: payload.harga,
        image: payload.image,
        status: payload.status,
        deskripsi: payload.deskripsi,
        prominent: payload.prominent
      }
      // menghubungkan ke firebase dan simpan di store
      commit('createRoom', room)
    },
    //Aksi untuk daftar ke firebase auth
    signUserUp ({commit}, payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.user.uid,
            registeredRooms: []
          }
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          console.log(error)
        }
      )
    },
    //Aksi untuk login ke firebase auth
    signUserIn ({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.user.uid,
            registeredRooms: []
          }
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          console.log(error)
        }
      )
    }
  },
  modules: {
  }
})
