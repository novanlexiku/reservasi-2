<template>
  <div class="checkout">
<!-- Expansion Panel -->
  <v-container class="my-5">
     <!-- Snackbar -->
        <v-snackbar v-model="snackbar" top color="warning">
          <span>Pelanggan telah mengembalikan kunci ruangan</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
    <h2 class="subtitle-1 ma-4">Pelanggan Siap Melakukan Check-out</h2>
      <v-expansion-panels>
      <v-expansion-panel v-for="checkout in checkouts" :key="checkout.nama">
        <v-expansion-panel-header disable-icon-rotate>Check-out oleh {{checkout.nama}}
          <template v-slot:actions>
            <v-icon color="teal">mdi-chevron-left-box-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-4 grey--text">
          <div class="font-weight-bold">Data Penyewa</div>
          <div>ID Pemesan : {{checkout.reserv_id}}</div>
          <div>Room ID : {{checkout.room_id}}</div>
          <div>Nama Pemesan : {{checkout.nama}}</div>
          <div>Total Biaya Pemesanan : Rp.{{checkout.total}}</div>
          <div>Lama Sewa : {{checkout.sewa}} hari</div>
          <div>Tanggal Check-In : {{checkout.checkin}}</div>
          <div>Status Pemesanan : {{checkout.status_reservasi}}</div>
        <Checkout :checkout="checkout" @checkout="snackbar=true"/>
          </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  </div>
</template>

<script>
import Checkout from '../check/checkform/FormCheckOut'
export default {
    components:{Checkout},
    data: () => ({
    snackbar:false
    }),
    // sorting data
    computed:{
    checkouts(){
        return this.$store.getters.loadedReservasiCheckin
    },
    
  },
}
</script>

<style>

</style>