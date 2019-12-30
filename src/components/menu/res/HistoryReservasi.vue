<template>
  <div class="listreservasi">
      <h1 class="ml-5 subtitle-1 grey--text">Riwayat pemesanan</h1>
<!-- Expansion Panel -->
  <v-container class="my-5">
    
    <h2 class="subtitle-1 ma-4">Complete</h2>
      <v-expansion-panels>
      <v-expansion-panel v-for="history in historys" :key="history.title">
        <v-expansion-panel-header>Pemesanan tanggal {{history.checkin}}</v-expansion-panel-header>
        <v-expansion-panel-content class="px-4 grey--text">
          <div class="font-weight-bold">Oleh {{history.nama}} untuk {{history.sewa}} hari</div>
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