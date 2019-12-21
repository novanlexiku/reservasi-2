import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import db from '../fb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedRooms: [],
    reservasi:[],
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
    createReservasi (state, payload){
      state.reservasi.push(payload)
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
      // set data menggunakan cloud firestore
      db.collection("rooms")
      .onSnapshot(function(querySnapshot) {
        const rooms = []
        querySnapshot.forEach((doc) => {
          rooms.push({
            ...doc.data(),
            id: doc.id
          })
          commit('setLoadedRooms', rooms)
          commit('setLoading', false)
     })
      })
    // Set data menggunakan realtime database
        // firebase.database().ref('rooms').once('value')
        // .then((data) => {
        //   const rooms = []
        //   const obj = data.val()
        //   for (let key in obj) {
        //     rooms.push({
        //       id: key,
        //       title: obj[key].title,
        //       deskripsi: obj[key].deskripsi,
        //       image: obj[key].image,
        //       harga: obj[key].harga,
        //       status: obj[key].status,
        //       prominent: obj[key].prominent
        //     })
        //   }
        //   commit('setLoadedRooms', rooms)
        //   commit('setLoading', false)
        // })
        // .catch(
        //   (error) => {
        //     console.log(error)
        //     commit('setLoading', false)
        //   }
        // )
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
      // menghubungkan ke firebase dan simpan di cloud firestore
      db.collection('rooms').add(room).then(() => {
        commit('setLoading', false)
        })

      // simpan data ke dalam realtime database
      // firebase.database().ref('rooms').push(room)
      // .then((data) => {
      //   const key = data.key
      //   commit('createRoom', {
      //     ...room,
      //     id: key
      //   })

      // })
    },
    // aksi untuk menyimpan data reservasi dengan batch
    createReservasi ({commit}, payload) {

      // Get a new write batch
      var batch = db.batch();

      // Set the value of doc
      var add = db.collection("reservasi").doc(payload.id);
      batch.set(add, {
        id: payload.id,
        nama: payload.nama,
        no_ktp: payload.no_ktp,
        telp: payload.telp,
        checkin: payload.checkin,
        sewa: payload.sewa,
        total: payload.total
      });

      // Update the data
      var update = db.collection("rooms").doc(payload.id);
      batch.update(update, {
        status: payload.status
      });

      // Commit the batch
      batch.commit().then(function () {
        commit('setLoading', false)
        console.log("Document successfully updated!");
      });
    
    // menghubungkan ke firebase dan simpan di cloud firestore
    //  db.collection("rooms").doc(payload.id).update({
    //     nama: payload.nama,
    //     no_ktp: payload.no_ktp,
    //     telp: payload.telp,
    //     checkin: payload.checkin,
    //     status: payload.status,
    //     sewa: payload.sewa,
    //     total: payload.total
    //   })
    //   .then(function() {
    //     commit('setLoading', false)
    //       console.log("Document successfully updated!");
    //   })
    //   .catch(function(error) {
    //       // The document probably doesn't exist.
    //       console.error("Error updating document: ", error);
    //   });
            
      
      
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
