<template>
  <div class="history">
      <h1 class="ml-5 subtitle-1 grey--text">Riwayat pemesanan</h1>
<!-- Expansion Panel -->
  <v-container class="my-5">

    <h2 class="subtitle-1 ma-4">Pemesanan belum diproses</h2>
      <v-expansion-panels>
      <v-expansion-panel  v-for="history in historys" :key="history.title">
        <v-expansion-panel-header>Pemesanan tanggal {{history.checkin}}</v-expansion-panel-header>
        <v-expansion-panel-content class="px-4 grey--text">
          <div class="font-weight-bold">Lakukan Konfirmasi Pembayaran</div>
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
    // filter data
    computed:{
    historys(){
        return this.$store.getters.featuredReservasi.filter(historys => {
          return historys.reserv_id === this.$store.getters.user.id
        })
    },
  },
}
</script>

<style>

</style>