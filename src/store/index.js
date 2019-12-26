import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import db from '../fb'

Vue.use(Vuex)

export default new Vuex.Store({
  // STATE = KONDISI AWAL DARI DATA
  state: {
    loadedBanks:[],
    loadedRooms: [],
    loadedReservasi:[],
    loadedUsers:[],
    user: null,
    loading: false,
    error: null
  },
  // MUTATION = MENGATUR / MENYIMPAN PERUBAHAN DATA
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
    // update data room
    updateRoom (state, payload) {
      const room = state.loadedRooms.find(room => {
        return room.id === payload.id
      })
      if (payload.title) {
        room.title = payload.title
      }
      if (payload.deskripsi) {
        room.deskripsi = payload.deskripsi
      }
      if (payload.harga) {
        room.harga = payload.harga
      }
    },
    // update data bank
    updateBank (state, payload) {
      const bank = state.loadedBanks.find(bank => {
        return bank.id === payload.id
      })
      if (payload.title) {
        bank.title = payload.title
      }
      if (payload.rekening) {
        bank.rekening = payload.rekening
      }
      if (payload.nama) {
        bank.nama = payload.nama
      }
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
    setLoadedUsers (state, payload){
      state.loadedUsers = payload
    },
    setLoadedUser (state, payload){
      state.user = payload
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
  // ACTION = AKSI / FUNGSI YANG MENGUBAH DATA
  actions: {
    // load data semua user
    loadUsers ({commit}) {
      
      // set data menggunakan cloud firestore
      db.collection("users")
      .onSnapshot(function(querySnapshot) {
        const users = []
        querySnapshot.forEach((doc) => {
          users.push({
            ...doc.data(),
            id: doc.id
          })
          commit('setLoadedUsers', users)
          
     })
      })    
    },
    // load data room
    loadRooms ({commit}) {
      
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
          
     })
      })    
    },
    // load data bank
    loadBanks ({commit}) {
      
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
          
     })
      })
    },

    // load data reservasi
    loadReservasi ({commit}) {
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
    // aksi edit bank
    editBank ({commit}, payload){
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.rekening) {
        updateObj.rekening = payload.rekening
      }
      if (payload.nama) {
        updateObj.nama = payload.nama
      }
      var update = db.collection("banks").doc(payload.id);
      update.update(updateObj)
      .then(() => {
        
        commit('updateBank', payload)
      })
      .catch(error => {
        console.log(error)
        
      })
    },
    // aksi untuk menyimpan data room
    createRoom ({commit, getters}, payload) {
      const room = {
        title: payload.title,
        harga: payload.harga,
        status: payload.status,
        deskripsi: payload.deskripsi,
        jenis: payload.jenis,
        prominent: payload.prominent,
        creatorId: getters.user.id
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
        let imagePath = filedata.metadata.fullPath
        return firebase.storage().ref().child(imagePath).getDownloadURL()
      })
      .then(url => {
        // update database field image dengan di isi url gambar
        imageUrl = url
        return db.collection('rooms').doc(key).update({image: imageUrl})
      })
      .then(() => {
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    //Aksi edit room
    EditRoom ({commit}, payload){
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.deskripsi) {
        updateObj.deskripsi = payload.deskripsi
      }
      if (payload.harga) {
        updateObj.harga = payload.harga
      }
      var update = db.collection("rooms").doc(payload.id);
      update.update(updateObj)
      .then(() => {
        
        commit('updateRoom', payload)
      })
      .catch(error => {
        console.log(error)
        
      })
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
      })
      
    },

    // AKSI UNTUK DAFTAR KE FIREBASE AUTH
    signUserUp ({commit, getters}, payload){
      
      commit('clearError')
      // DAFTAR FIREBASE AUTH
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
          
          const newUser = {
            id: user.user.uid,
            registeredRooms: []
          }
          commit('setUser', newUser)
        })
        .then(() =>{
          // AMBIL DATA DARI FORM INPUT
          const users = {
            id: getters.user.id,
            nama: payload.nama,
            email: payload.email,
            role: payload.role
          }
          let imageUrl
          let key
          // menghubungkan ke firebase dan simpan di cloud firestore
          db.collection('users').doc(users.id).set(users)
          .then(() => {
            // ambil id database sebagai key
            key = getters.user.id
            return key
          })
          .then(key => {
            // edit nama gambar kemudian simpan ke storage
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref('users/' + key + ext).put(payload.image)
          })
          .then(filedata => {
            // ambil url gambar dari storage
            let imagePath = filedata.metadata.fullPath
            return firebase.storage().ref().child(imagePath).getDownloadURL()
          })
          .then(url => {
            // update database field image dengan di isi url gambar
            imageUrl = url
            return db.collection('users').doc(key).update({image: imageUrl})
          })
          .then(() => {
            // Ambil data yang sudah di input sesuai ID user
            db.collection('users').doc(getters.user.id).get()
            .then((doc)=> {
              // console untuk keperluan white box test
                if (doc.exists) {
                    console.log("Document data:", doc.data())
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!")
                }
            })
            .catch(function(error) {
                console.log("Error getting document:", error)
            })
          })
          .then(()=>{
            // Update data user yang ada di firebase auth
            firebase.auth().currentUser.updateProfile({
              displayName: payload.nama,
              photoURL: imageUrl
            }).then(function() {
              // Update successful.
            }).catch(function(error) {
              // An error happened.
              console.log(error)
            })
          })
          .catch((error) => {
            console.log(error)
          })
        // Simpan data
        })
        .catch(
        error => {
          
          commit('setError', error)
          console.log(error)
        })
    },
    //Aksi untuk login ke firebase auth
    signUserIn ({commit, getters}, payload){
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
          const newUser = {
            id: user.user.uid,
          }
          commit('setUser', newUser)
        })
        .then(() => {
          // Ambil data yang sudah di input sesuai ID user
          db.collection('users').doc(getters.user.id).get()
          .then((doc)=> {
            // console untuk keperluan white box test
              if (doc.exists) {
                  console.log("Document data:", doc.data())
                  const newUser = {
                    id: doc.data().id,
                    nama: doc.data().nama,
                    image: doc.data().image,
                    email: doc.data().email,
                    role: doc.data().role
                  }
                  commit('setUser', newUser)
              } else {
                  // doc.data() yang tampil adalah undefined
                  console.log("No such document!")
              }
          })
          .catch(function(error) {
              console.log("Error getting document:", error)
          })
        })
        .catch(
        error => {
          
          commit('setError', error)
          console.log(error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid})
      // Ambil data yang sudah di input sesuai ID user
      db.collection('users').doc(payload.uid).get()
      .then((doc)=> {
        // console untuk keperluan white box test
          if (doc.exists) {
              console.log("Document data:", doc.data())
              const newUser = {
                id: doc.data().id,
                nama: doc.data().nama,
                image: doc.data().image,
                email: doc.data().email,
                role: doc.data().role
              }
              commit('setUser', newUser)
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!")
          }
      })
      .catch(function(error) {
          console.log("Error getting document:", error)
      })
    },
    clearError ({commit}) {
      commit('clearError')
    },
  },
  // GETTERS = MENGAMBIL DATA DARI STATE
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
    loadedUsers (state) {
      return state.loadedUsers.filter(user =>{
        return user.role === 'pelanggan' || user.role === 'karyawan'
      })
    },
    // load data banks
    featuredBanks (state){
      return state.loadedBanks
    },
    featuredReservasi (state){
      return state.loadedReservasi
    },
    loadedUser (state) {
      return state.user
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
  modules: {
  }
})
