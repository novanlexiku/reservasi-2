<template>
  <div class="listreservasi">
<!-- Expansion Panel -->
  <v-container class="my-5">
    
    <h2 class="subtitle-1 ma-4">Pemesanan Selesai dan Sudah di konfirmasi</h2>
      <v-expansion-panels>
      <v-expansion-panel v-for="history in historys" :key="history.title">
        <v-expansion-panel-header disable-icon-rotate>Pemesanan oleh {{history.nama}} untuk reservasi tanggal {{history.checkin}}
          <template v-slot:actions>
            <v-icon color="teal">mdi-check</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-4 grey--text">
          <div class="font-weight-bold">Sudah melakukan konfirmasi pembayaran</div>
          <div>ID Pemesan : {{history.reserv_id}}</div>
          <div>Nama Pemesan : {{history.nama}}</div>
          <div>Total Biaya Pemesanan : Rp.{{history.total}}</div>
          <div>Lama Sewa : {{history.sewa}} hari</div>
          <div>Tanggal Chek-in : {{history.checkin}}</div>
          <div>Status Pemesanan : {{history.status_reservasi}}</div>
          </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  </div>
</template>

<script>
export default {
    data: () => ({
    
    }),
    // sorting data
    computed:{
    historys(){
              return this.$store.getters.loadedReservasiComplete
    },
    
  },
}
</script>

<style>

</style>