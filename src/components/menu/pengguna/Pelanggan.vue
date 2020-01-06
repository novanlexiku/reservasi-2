<template>
  <div class="pelanggan">
      <v-container class="my-5">
        
        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" top color="success">
          <span>Selamat! Pelanggan berhasil ditambahkan</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbar2" top color="alert">
          <span>Data Pelanggan Berhasil di Hapus</span>
          <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
        </v-snackbar>
          <!-- Sort data + tooltip -->
           <v-row class="mb-3">
            <v-spacer></v-spacer>
            <Pelanggan @tambahPelanggan="snackbar=true"/>
           </v-row>
          <!-- Grid data with chip -->
          <v-card flat class="pa-3" v-for="user in users" :key="user.nama">
              <v-row wrap :class="`pa-3 user ${user.role}`">
                <v-col cols="6" md="2">
                      <div class="caption grey--text">Avatar</div>
                      <div class="justify-end"><v-img aspect-ratio="1" :src="user.image"></v-img></div>
                  </v-col>
                  <v-col cols="12" md="2">
                      <div class="caption grey--text">Nama</div>
                      <div>{{user.nama}}</div>
                  </v-col>
                  <v-col cols="6" md="2">
                      <div class="caption grey--text">Email</div>
                      <div>{{user.email}}</div>
                  </v-col>
                  <v-col cols="6" md="2">
                        <div class="caption grey--text">No KTP</div>
                        <div class="justify-end">
                          <div>{{user.no_ktp}}</div>
                        </div>
                  </v-col>
                  <v-col cols="6" md="2">
                        <div class="caption grey--text">Status</div>
                        <div class="justify-end">
                            <v-chip small :color="`${user.role}`" :class="`v-chip--active white--text caption my-2`">{{user.role}}</v-chip>
                        </div>
                  </v-col>
                  <v-col cols="6" md="2">
                        <div class="caption grey--text">Aksi</div>
                        <div class="justify-end">
                    <Edit :user="user" @editPelanggan="snackbar=true"/>
                    <Delete :user="user" @deletePelanggan="snackbar2=true"/>
                    </div>
                  </v-col>
              </v-row>
            <v-divider></v-divider>
          </v-card>
      </v-container>
  </div>
</template>

<script>
import Edit from '../pengguna/edit/EditPelanggan'
import Pelanggan from '../pengguna/AddPelanggan'
import Delete from '../pengguna/delete/DeletePelanggan'

export default {
  components: {Pelanggan, Edit, Delete},
    data: () => ({
      snackbar: false,
      snackbar2: false
    }),
    computed: {
      users () {
        return this.$store.getters.loadedPelanggan
      },
    },
    // sort method
    methods:{
        sortByA(prop){
      this.users.sort((a,b) => a[prop] > b[prop] ? -1:1)
    },
    sortByB(prop){
      this.users.sort((a,b) => a[prop] < b[prop] ? -1:1)
    },
    
    },
    
}
</script>

<style>
.user.pelanggan {
  border-left : 4px solid green;
}
.user.karyawan {
  border-left : 4px solid orange;
}
.user.admin {
  border-left : 4px solid red;
}
.v-chip.pelanggan {
  background :  green;
}
.v-chip.karyawan {
  background:  orange;
}
.v-chip.admin {
  background :  red;
}
</style>