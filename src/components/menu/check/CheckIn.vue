<template>
  <div class="checkin">
<!-- Expansion Panel -->
  <v-container class="my-5">
     <!-- Snackbar -->
        <v-snackbar v-model="snackbar" top color="warning">
          <span>Pelanggan berhasil Check-In</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
    <h2 class="subtitle-1 ma-4">Pemesanan Selesai dan Menunggu Pelanggan Check-In</h2>
      <v-expansion-panels>
      <v-expansion-panel v-for="checkin in checkins" :key="checkin.nama">
        <v-expansion-panel-header disable-icon-rotate>Pemesanan oleh {{checkin.nama}} untuk reservasi tanggal {{checkin.checkin}}
          <template v-slot:actions>
            <v-icon color="teal">mdi-checkin</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-4 grey--text">
          <div class="font-weight-bold">Sudah melakukan konfirmasi pembayaran</div>
          <div>ID Pemesan : {{checkin.reserv_id}}</div>
          <div>Nama Pemesan : {{checkin.nama}}</div>
          <div>Total Biaya Pemesanan : Rp.{{checkin.total}}</div>
          <div>Lama Sewa : {{checkin.sewa}} hari</div>
          <div>Tanggal Check-In : {{checkin.checkin}}</div>
          <div>Status Pemesanan : {{checkin.status_reservasi}}</div>
        <Checkin :checkin="checkin" @checkin="snackbar=true"/>
          </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  </div>
</template>

<script>
import Checkin from '../check/checkform/FormCheckIn'
export default {
    components:{Checkin},
    data: () => ({
    snackbar:false
    }),
    // sorting data
    computed:{
    checkins(){
              return this.$store.getters.loadedReservasiComplete
    },
    
  },
}
</script>

<style>

</style>