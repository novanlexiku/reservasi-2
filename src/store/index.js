import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import db from '../fb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedBanks:[],
    loadedRooms: [],
    loadedReservasi:[],
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
    // Filter data yang akan di load
    loadedBanks (state){
      return state.loadedBanks.filter(bank =>{
        return bank.status === 'available'
      })
    },
    // Data di load per id
    loadedReserv (state){
      return (reservasiID) => {
        return state.loadedReservasi.find((reservasi) => {
          return reservasi.id === reservasiID
        })
      } 
    },
    // load data banks
    featuredBanks (state){
      return state.loadedBanks
    },
    featuredReservasi (state){
      return state.loadedReservasi
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
    // set perubahan data room
    setLoadedRooms (state, payload) {
      state.loadedRooms = payload
    },
    // push data room   
    createRoom (state, payload){
      state.loadedRooms.push(payload)
    },
    // set perubahan data bank
    setLoadedBanks (state, payload){
      state.loadedBanks = payload
    },
    // push data bank
    createBanks (state, payload){
      state.loadedBanks.push(payload)
    }, 
    setLoadedReservasi (state, payload){
      state.loadedReservasi = payload
    },
    // push data reservasi
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
    // load data bank
    loadBanks ({commit}) {
      commit('setLoading', true)
      // set data menggunakan cloud firestore
      db.collection("banks")
      .onSnapshot(function(querySnapshot) {
        const banks = []
        querySnapshot.forEach((doc) => {
          banks.push({
            ...doc.data(),
            id: doc.id

          })
          commit('setLoadedBanks',banks)
          commit('setLoading', false)
     })
      })
    
    },

    // load data reservasi
    loadReservasi ({commit}) {
      commit('setLoading', true)
      // set data menggunakan cloud firestore
      db.collection("reservasi")
      .onSnapshot(function(querySnapshot) {
        const reservasi = []
        querySnapshot.forEach((doc) => {
          reservasi.push({
            ...doc.data(),
            id: doc.id
          })
          commit('setLoadedReservasi',reservasi)
          commit('setLoading', false)
     })
      })
    
    },
    // simpan data bank ke cloud firestore
    createBank ({commit}, payload) {
      const bank = {
        title: payload.title,
        rekening: payload.rekening,
        nama: payload.nama,
        status: payload.status,
      }
      // menghubungkan ke firebase dan simpan di cloud firestore
      db.collection('banks').add(bank).then(() => {
        console.log(bank)
        commit('setLoading', false)
        })
    },
    // aksi untuk menyimpan data room
    createRoom ({commit}, payload) {
      const room = {
        title: payload.title,
        harga: payload.harga,
        status: payload.status,
        deskripsi: payload.deskripsi,
        prominent: payload.prominent
      }
      let imageUrl
      let key
      // menghubungkan ke firebase dan simpan di cloud firestore
      db.collection('rooms').add(room)
      .then((data) => {
        // ambil id database sebagai key
        key = data.id
        return key
      })
      .then(key => {
        // edit nama gambar kemudian simpan ke storage
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('rooms/' + key + ext).put(payload.image)
      })
      .then(filedata => {
        // ambil url gambar dari storage
        let imagePath = filedata.metadata.fullPath;
        return firebase.storage().ref().child(imagePath).getDownloadURL();
      })
      .then(url => {
        // update database field image dengan di isi url gambar
        imageUrl = url;
        return db.collection('rooms').doc(key).update({image: imageUrl});
      })
      .then(() => {
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
      })
    // Reach out to firebase and store it

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
    createReservasi ({commit, getters}, payload) {
      // Get a new write batch
      var batch = db.batch();
      // Set the value of doc
      var add = db.collection("reservasi").doc();
      batch.set(add, {
        reserv_id: getters.user.id,
        nama: payload.nama,
        no_ktp: payload.no_ktp,
        telp: payload.telp,
        checkin: payload.checkin,
        bank: payload.bank,
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
        console.log("Reservasi berhasil di buat");
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
