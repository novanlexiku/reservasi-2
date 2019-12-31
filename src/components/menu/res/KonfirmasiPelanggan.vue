<template>
  <div class="konfirmasipelanggan">
<!-- Expansion Panel -->
  <v-container class="my-5">
    <!-- Snackbar -->
        <v-snackbar v-model="snackbar" top color="warning">
          <span>Pembayaran sedang di konfirmasi</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <!-- expansion panel -->
    <h2 class="subtitle-1 ma-4">Pemesanan belum di konfirmasi</h2>
      <v-expansion-panels>
      <v-expansion-panel v-for="history in historys" :key="history.title">
        <v-expansion-panel-header disable-icon-rotate>Pemesanan tanggal {{history.checkin}}
          <template v-slot:actions>
            <v-icon color="error">mdi-alert-circle</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-4 grey--text">
          <div class="font-weight-bold">Belum melakukan konfirmasi pembayaran</div>
          <div>ID Pemesan : {{history.reserv_id}}</div>
          <div>Nama Pemesan : {{history.nama}}</div>
          <div>Total Biaya Pemesanan : Rp.{{history.total}}</div>
          <div>Lama Sewa : {{history.sewa}} hari</div>
          <div>Tanggal Chek-in : {{history.checkin}}</div>
          <div>Status Pemesanan : {{history.status_reservasi}}</div>
          <Konfirmasi :history="history" @konfirmasi="snackbar=true"/>
          </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  </div>
</template>

<script>
import Konfirmasi from '../res/konfirmasi/FormKonfirmasi'
export default {
  components: {Konfirmasi},
    data: () => ({
    snackbar:false
    }),
    // sorting data
    computed:{
    historys(){
          return this.$store.getters.featuredReservasi.filter(historys => {
          return historys.reserv_id === this.$store.getters.user.id && historys.status_reservasi === 'diproses' || historys.status_reservasi === 'menunggu'
        })    
        },
    
  },
}
</script>

<style>

</style>