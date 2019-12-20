import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedRooms: [],
    user: null,
    loading: false,
    error: null
  },
  getters: {
    //data yang akan ditampilkan di landing
    featuredRooms (state) {
      return state.loadedRooms
    },
    // Filter data yang akan di load
    loadedRooms (state){
      return state.loadedRooms.filter(room =>{
        return room.status === 'available'
      })
    },
    // Data di load per id
    loadedRoom (state){
      return (roomID) => {
        return state.loadedRooms.find((room) => {
          return room.id === roomID
        })
      } 
    },
    user (state) {
      return state.user
    },
    loading (state){
      return state.loading
    },
    error (state) {
      return state.error
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),

    setLoadedRooms (state, payload) {
      state.loadedRooms = payload
    },    
    createRoom (state, payload){
      state.loadedRooms.push(payload)
    },
    setUser (state, payload){
      state.user = payload
    },
    setLoading (state, payload){
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadRooms ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('rooms').once('value')
        .then((data) => {
          const rooms = []
          const obj = data.val()
          for (let key in obj) {
            rooms.push({
              id: key,
              title: obj[key].title,
              deskripsi: obj[key].deskripsi,
              image: obj[key].image,
              harga: obj[key].harga,
              status: obj[key].status,
              prominent: obj[key].prominent
            })
          }
          commit('setLoadedRooms', rooms)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    // aksi untuk menyimpan data room
    createRoom ({commit}, payload) {
      const room = {
        title: payload.title,
        harga: payload.harga,
        image: payload.image,
        status: payload.status,
        deskripsi: payload.deskripsi,
        prominent: payload.prominent
      }
      firebase.database().ref('rooms').push(room)
      .then((data) => {
        const key = data.key
        commit('createRoom', {
          ...room,
          id: key
        })

      })
      // menghubungkan ke firebase dan simpan di store
    },
    //Aksi untuk daftar ke firebase auth
    signUserUp ({commit}, payload){
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredRooms: []
          }
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    //Aksi untuk login ke firebase auth
    signUserIn ({commit}, payload){
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredRooms: []
          }
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  modules: {
  }
})
