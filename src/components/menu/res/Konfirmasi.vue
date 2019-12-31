<template>
  <div class="konfirmasi">
<!-- Expansion Panel -->
  <v-container class="my-5">
    <!-- Snackbar -->
        <v-snackbar v-model="snackbar" top color="warning">
          <span>Pembayaran sudah di konfirmasi</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <!-- expansion panel -->
    <h2 class="subtitle-1 ma-4">Menunggu Konfirmasi</h2>
      <v-expansion-panels>
      <v-expansion-panel v-for="konfirmasi in konfirmasi" :key="konfirmasi.title" :id="konfirmasi.id">
        <v-expansion-panel-header disable-icon-rotate>Pemesanan oleh {{konfirmasi.nama}} untuk reservasi tanggal {{konfirmasi.checkin}}
          <template v-slot:actions>
            <v-icon color="error">mdi-alert-circle</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-4 grey--text">
          <div class="font-weight-bold">Proses Konfirmasi</div>
          <div>ID Pemesan : {{konfirmasi.reserv_id}}</div>
          <div>ID Reservasi : {{konfirmasi.reservasi_id}}</div>
          <div>Nama Pemesan : {{konfirmasi.nama}}</div>
          <div>
            Bukti Pembayaran :
            <v-img
                                                :src="konfirmasi.image"
                                                height="194"
                                                max-width="300"
                                                class="mr-1"
                                                ></v-img>
          </div>
          <Konfirmasi :konfirmasi="konfirmasi" @konfirmasi="snackbar=true"/>
          </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  </div>
</template>

<script>
import Konfirmasi from '../res/konfirmasi/AdminKonfirmasi'

export default {
  components:{Konfirmasi},
    data: () => ({
        snackbar:false
    }),
    // sorting data
    computed:{
    konfirmasi(){
          return this.$store.getters.loadedKonfirmasi
          },
    
  },
  methods:{
    
  }
}
</script>

<style>

</style>