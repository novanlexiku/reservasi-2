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
    loadedKonfirmasi:[],
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
    // update data pengguna
    updatePengguna (state, payload) {
      const user = state.loadedUsers.find(user => {
        return user.id === payload.id
      })
      if (payload.nama) {
        user.nama = payload.nama
      }
      if (payload.no_ktp) {
        user.no_ktp = payload.no_ktp
      }
      if (payload.no_hp) {
        user.no_hp = payload.no_hp
      }
      if (payload.tgllhr) {
        user.tgllhr = payload.tgllhr
      }
      if (payload.alamat) {
        user.alamat = payload.alamat
      }
    },
    // update data pelanggan
    updatePelanggan (state, payload) {
      const user = state.loadedUsers.find(user => {
        return user.id === payload.id
      })
      if (payload.nama) {
        user.nama = payload.nama
      }
      if (payload.no_ktp) {
        user.no_ktp = payload.no_ktp
      }
      if (payload.no_hp) {
        user.no_hp = payload.no_hp
      }
      if (payload.tgllhr) {
        user.tgllhr = payload.tgllhr
      }
      if (payload.alamat) {
        user.alamat = payload.alamat
      }
    },
    // update data karyawan
    updateKaryawan (state, payload) {
      const user = state.loadedUsers.find(user => {
        return user.id === payload.id
      })
      if (payload.nama) {
        user.nama = payload.nama
      }
      if (payload.no_ktp) {
        user.no_ktp = payload.no_ktp
      }
      if (payload.no_hp) {
        user.no_hp = payload.no_hp
      }
      if (payload.tgllhr) {
        user.tgllhr = payload.tgllhr
      }
      if (payload.alamat) {
        user.alamat = payload.alamat
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
    setLoadedKonfirmasi (state, payload){
      state.loadedKonfirmasi = payload
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
    // load data konfirmasi
    loadKonfirmasi ({commit}) {
      // set data menggunakan cloud firestore
      db.collection("konfirmasi")
      .onSnapshot(function(querySnapshot) {
        const konfirmasi = []
        querySnapshot.forEach((doc) => {
          konfirmasi.push({
            ...doc.data(),
            id: doc.id
          })
          commit('setLoadedKonfirmasi',konfirmasi)
          
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
    // AKSI UNTUK DELETE ROOM
    deleteBank({commit}, payload){
      db.collection("banks").doc(payload.id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
      commit('clearError')
        console.error("Error removing document: ", error);
    });
    
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
        console.log('Upload Berhasil')
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
    // AKSI UNTUK DELETE ROOM
    deleteRoom({commit}, payload){
      db.collection("rooms").doc(payload.id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
      commit('clearError')
        console.error("Error removing document: ", error);
    });
    
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
        tanggal : payload.tanggal,
        waktu: payload.waktu,
        checkin: payload.checkin,
        bank: payload.bank,
        sewa: payload.sewa,
        total: payload.total,
        room_id: payload.id,
        status_reservasi: payload.status_reservasi
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
    // KONFIRMASI OLEH ADMIN
    konfirmasi({commit},payload){
      const updateObj = {
        status_konfirmasi: payload.status_konfirmasi,
      }
      
      if (payload.reservasi_id){
        updateObj.reservasi_id = payload.reservasi_id
      }
      // menghubungkan ke firebase dan simpan di cloud firestore
      db.collection('konfirmasi').doc(payload.konfirmasi_id).update({
        status_konfirmasi: payload.status_konfirmasi
      })
      .then(() => {
        commit('setLoading', false)
        var update = db.collection("reservasi").doc(payload.reservasi_id);
        // Set the "capital" field of the city 'DC'
        return update.update({
          status_reservasi: payload.status_reservasi
        })
        .then(function() {
            console.log("Status Berhasil di update");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
      })
      .catch((error) => {
        console.log(error)
      })
    },
    // CHECK-IN OLEH ADMIN
    checkin({commit},payload){
      const updateObj = {
        status_reservasi: payload.status_reservasi,
      }
      if (payload.reservasi_id){
        updateObj.reservasi_id = payload.reservasi_id
      }
      commit('setLoading', false)
      // menghubungkan ke firebase dan simpan di cloud firestore
      db.collection('reservasi').doc(payload.reservasi_id).update({
        status_reservasi: payload.status_reservasi
      })
      .then(function() {
        console.log("Pelanggan berhasil Check-In");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    })
    },
    // CHECK-OUT OLEH ADMIN
    checkout({commit},payload){
      const updateObj = {
        status_reservasi: payload.status_reservasi,
        status: payload.status
      }
      if (payload.reservasi_id){
        updateObj.reservasi_id = payload.reservasi_id
      }
      if (payload.room_id){
        updateObj.room_id = payload.room_id
      }
      commit('setLoading', false)
      // menghubungkan ke firebase dan simpan di cloud firestore
      db.collection('reservasi').doc(payload.reservasi_id).update({
        status_reservasi: payload.status_reservasi
      })
      .then(() => {
        console.log("Pelanggan berhasil Check-Out");
      })
      .then(()=>{
        db.collection('rooms').doc(payload.room_id).update({
          status: payload.status
        })
        .then(() => {
          console.log("Status Ruangan Sudah di update");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      })
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      })
    },
    // KONFIRMASI PEMBAYARAN OLEH PELANGGAN
    konfirmasiReservasi ({commit, getters}, payload){
      const updateObj = {
        reserv_id:getters.user.id,
        status_konfirmasi: payload.status_konfirmasi,
      }
      if (payload.nama) {
        updateObj.nama = payload.nama
      }
      if (payload.total) {
        updateObj.total = payload.total
      }
      if (payload.reservasi_id){
        updateObj.reservasi_id = payload.reservasi_id
      }
      if (payload.checkin){
        updateObj.checkin = payload.checkin
      }
      let imageUrl
      let key
      // menghubungkan ke firebase dan simpan di cloud firestore
      db.collection('konfirmasi').add(updateObj)
      .then((data) => {
        // ambil id database sebagai key
        key = data.id
        return key
      })
      .then(key => {
        // edit nama gambar kemudian simpan ke storage
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('konfirmasi/' + key + ext).put(payload.image)
      })
      .then(filedata => {
        console.log('Upload Berhasil')
        // ambil url gambar dari storage
        let imagePath = filedata.metadata.fullPath
        console.log('gambar sudah di upload')
        return firebase.storage().ref().child(imagePath).getDownloadURL()
      })
      .then(url => {
        // update database field image dengan di isi url gambar
        imageUrl = url
        return db.collection('konfirmasi').doc(key).update({image: imageUrl})
      })
      .then(() => {
        commit('setLoading', false)
        var update = db.collection("reservasi").doc(payload.reservasi_id);
        // Set the "capital" field of the city 'DC'
        return update.update({
          status_reservasi: payload.status_reservasi
        })
        .then(function() {
            console.log("Status Berhasil di update");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
      })
      .catch((error) => {
        console.log(error)
      })
    },
    // AKSI UPDATE PENGGUNA PADA PROFILE
    updatePengguna ({commit, getters}, payload){
      const updateObj = {}
      if (payload.nama) {
        updateObj.nama = payload.nama
      }
      if (payload.no_ktp) {
        updateObj.no_ktp = payload.no_ktp
      }
      if (payload.no_hp) {
        updateObj.no_hp = payload.no_hp
      }
      if (payload.tgllhr) {
        updateObj.tgllhr = payload.tgllhr
      }
      if (payload.alamat) {
        updateObj.alamat = payload.alamat
      }
      
      var update = db.collection("users").doc(payload.id);
      update.update(updateObj)
      .then(() => {
        console.log(updateObj)
        commit('updatePengguna', payload)
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
                  password: doc.data().password,
                  role: doc.data().role,
                  alamat:doc.data().alamat,
                  tgllhr: doc.data().tgllhr,
                  no_ktp: doc.data().no_ktp,
                  no_hp: doc.data().no_hp
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
      .catch(error => {
        console.log(error)
        
      })
    },
    // AKSI DAFTAR PELANGGAN UNTUK KEPERLUAN OFFICE
    tambahPelanggan ({commit}, payload){
      const pengguna = {
        nama: payload.nama,
        no_ktp: payload.no_ktp,
        email: payload.email,
        password: payload.password,
        no_hp: payload.no_hp,
        tgllhr:payload.tgllhr,
        role: payload.role,
        alamat: payload.alamat,
        image: payload.image
      }
      // menghubungkan ke firebase dan simpan di cloud firestore
      db.collection('users').add(pengguna).then(() => {
        console.log(pengguna)
        commit('setLoading', false)
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        })
        .catch(error => {
          console.log(error)
          
        })
    },
    
    // AKSI EDIT PELANGGAN
    editPelanggan ({commit}, payload){
      const updateObj = {}
      if (payload.nama) {
        updateObj.nama = payload.nama
      }
      if (payload.no_ktp) {
        updateObj.no_ktp = payload.no_ktp
      }
      if (payload.no_hp) {
        updateObj.no_hp = payload.no_hp
      }
      if (payload.tgllhr) {
        updateObj.tgllhr = payload.tgllhr
      }
      if (payload.alamat) {
        updateObj.alamat = payload.alamat
      }
      
      var update = db.collection("users").doc(payload.id);
      update.update(updateObj)
      .then(() => {
        console.log("Data berhasil di update",updateObj)
        commit('updatePelanggan', payload)
      })
      
      .catch(error => {
        console.log(error)
        
      })
    },
    // AKSI UNTUK DELETE PELANGGAN
    deletePelanggan({commit}, payload){
      db.collection("users").doc(payload.id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
      commit('clearError')
        console.error("Error removing document: ", error);
    });
    
    },
    // aksi reset password
    resetPelanggan ({commit}, payload){
      firebase.auth().sendPasswordResetEmail(payload.email)
      commit('clearError')
    },
    
    // AKSI DAFTAR KARYAWAN UNTUK KEPERLUAN OFFICE
    tambahKaryawan ({commit}, payload){
      const pengguna = {
        nama: payload.nama,
        no_ktp: payload.no_ktp,
        email: payload.email,
        password: payload.password,
        no_hp: payload.no_hp,
        tgllhr:payload.tgllhr,
        role: payload.role,
        alamat: payload.alamat,
        image: payload.image
      }
      // menghubungkan ke firebase dan simpan di cloud firestore
      db.collection('users').add(pengguna).then(() => {
        console.log(pengguna)
        commit('setLoading', false)
        })
    },
    
    // AKSI EDIT KARYAWAN
    editKaryawan ({commit}, payload){
      const updateObj = {}
      if (payload.nama) {
        updateObj.nama = payload.nama
      }
      if (payload.no_ktp) {
        updateObj.no_ktp = payload.no_ktp
      }
      if (payload.no_hp) {
        updateObj.no_hp = payload.no_hp
      }
      if (payload.email) {
        updateObj.email = payload.email
      }
      if (payload.tgllhr) {
        updateObj.tgllhr = payload.tgllhr
      }
      if (payload.alamat) {
        updateObj.alamat = payload.alamat
      }
      
      var update = db.collection("users").doc(payload.id);
      update.update(updateObj)
      .then(() => {
        console.log(updateObj)
        commit('updateKaryawan', payload)
      })
      .catch(error => {
        console.log(error)
        
      })
    },
    // AKSI UNTUK DELETE KARYAWAN
    deleteKaryawan({commit}, payload){
      db.collection("users").doc(payload.id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
      commit('clearError')
        console.error("Error removing document: ", error);
    });
    
    },
    // aksi reset password
    resetKaryawan ({commit}, payload){
      firebase.auth().sendPasswordResetEmail(payload.email)
      commit('clearError')
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
            password: payload.password,
            role: payload.role,
            alamat:payload.alamat,
            tgllhr: payload.tgllhr,
            no_ktp: payload.no_ktp,
            no_hp: payload.no_hp
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
            console.log('Upload Berhasil')
            // ambil url gambar dari storage
            let imagePath = filedata.metadata.fullPath
            return firebase.storage().ref().child(imagePath).getDownloadURL()
          })
          .then(url => {
            // update database field image dengan di isi url gambar
            imageUrl = url
            return db.collection('users').doc(key).update({image: imageUrl})
          })
        // Simpan data
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
                    password: doc.data().password,
                    role: doc.data().role,
                    alamat:doc.data().alamat,
                    tgllhr: doc.data().tgllhr,
                    no_ktp: doc.data().no_ktp,
                    no_hp: doc.data().no_hp
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
                    password: doc.data().password,
                    role: doc.data().role,
                    alamat:doc.data().alamat,
                    tgllhr: doc.data().tgllhr,
                    no_ktp: doc.data().no_ktp,
                    no_hp: doc.data().no_hp
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
    // aksi auto login jika user belum logout
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
                password: doc.data().password,
                role: doc.data().role,
                alamat:doc.data().alamat,
                tgllhr: doc.data().tgllhr,
                no_ktp: doc.data().no_ktp,
                no_hp: doc.data().no_hp
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
    // aksi reset password
    resetPassword ({commit}, payload){
      firebase.auth().sendPasswordResetEmail(payload.email)
      commit('clearError')
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
    
    loadedPelanggan (state) {
      return state.loadedUsers.filter(user =>{
        return user.role === 'pelanggan'
      })
    },
    loadedKaryawan (state) {
      return state.loadedUsers.filter(user =>{
        return user.role === 'karyawan'
      })
    },
    // load data banks
    featuredBanks (state){
      return state.loadedBanks
    },
    // load data reservasi
    featuredReservasi (state){
      return state.loadedReservasi.filter(reservasi => {
        return reservasi.status_reservasi === 'diproses' || reservasi.status_reservasi === 'menunggu' 
        ||  reservasi.status_reservasi === 'complete' ||  reservasi.status_reservasi === 'checkin' ||  reservasi.status_reservasi === 'checkout' 
        ||  reservasi.status_reservasi === 'expired'
      })
    },
    //load data reservasi status = diproses
    loadedReservasiProses (state){
      return state.loadedReservasi.filter(reservasi => {
        return reservasi.status_reservasi === 'diproses' || reservasi.status_reservasi === 'menunggu'
      })
    },
    // load data reservasi status = complete
    loadedReservasiComplete (state){
      return state.loadedReservasi.filter(reservasi => {
        return reservasi.status_reservasi === 'complete'
      })
    },
    // load data reservasi status = complete
    loadedReservasiCheckin (state){
      return state.loadedReservasi.filter(reservasi => {
        return reservasi.status_reservasi === 'checkin'
      })
    },
    // load data reservasi status = complete
    loadedKonfirmasi (state){
      return state.loadedKonfirmasi.filter(konfirmasi => {
        return konfirmasi.status_konfirmasi === 'menunggu'
      })
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
