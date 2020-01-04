<template>
  <div class="history">
<!-- Expansion Panel -->
  <v-container class="my-5">
    <v-card
    class="mx-auto"
    max-width="800"
    >
      <v-card-title
        class="blue-grey white--text"
      >
        <span class="title">Riwayat Pemesanan</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="py-0">
        <v-timeline>
          <v-timeline-item
            v-for="history in historys" :key="history.nama"
            color="red lighten-2"
            large
          >
            <template v-if="history.status_reservasi === 'complete'" v-slot:opposite>
              <span>Pembayaran Selesai</span>
            </template>
            <template v-else-if="history.status_reservasi === 'diproses'" v-slot:opposite>
              <span>Lakukan Konfirmasi</span>
            </template>
            <template v-else-if="history.status_reservasi === 'menunggu'" v-slot:opposite>
              <span>Lakukan Konfirmasi</span>
            </template>
            <template v-else-if="history.status_reservasi === 'checkin'" v-slot:opposite>
              <span>Berhasil Check-In</span>
            </template>
            <template v-else-if="history.status_reservasi === 'checkout'" v-slot:opposite>
              <span>Berhasil Check-Out</span>
            </template>
            <v-card v-if="history.status_reservasi === 'complete'" class="elevation-2">
              <v-card-title class="headline">Pembayaran Selesai</v-card-title>
              <v-card-text>
                        <div>ID Pemesan : {{history.reserv_id}}</div>
                        <div>Nama Pemesan : {{history.nama}}</div>
                        <div>Total Biaya Pemesanan : Rp.{{history.total}}</div>
                        <div>Lama Sewa : {{history.sewa}} hari</div>
                        <div>Tanggal Check-in : {{history.checkin}}</div>
                        <div>Status Pemesanan : {{history.status_reservasi}}</div>
              </v-card-text>
            </v-card>
            <v-card v-else-if="history.status_reservasi === 'diproses'" class="elevation-2">
              <v-card-title class="headline">Lakukan Konfirmasi</v-card-title>
              <v-card-text>
                        <div>ID Pemesan : {{history.reserv_id}}</div>
                        <div>Nama Pemesan : {{history.nama}}</div>
                        <div>Total Biaya Pemesanan : Rp.{{history.total}}</div>
                        <div>Lama Sewa : {{history.sewa}} hari</div>
                        <div>Tanggal Check-in : {{history.checkin}}</div>
                        <div>Status Pemesanan : {{history.status_reservasi}}</div>
              </v-card-text>
            </v-card>
            <v-card v-else-if="history.status_reservasi === 'menunggu'" class="elevation-2">
              <v-card-title class="headline">Lakukan Konfirmasi</v-card-title>
              <v-card-text>
                        <div>ID Pemesan : {{history.reserv_id}}</div>
                        <div>Nama Pemesan : {{history.nama}}</div>
                        <div>Total Biaya Pemesanan : Rp.{{history.total}}</div>
                        <div>Lama Sewa : {{history.sewa}} hari</div>
                        <div>Tanggal Check-in : {{history.checkin}}</div>
                        <div>Status Pemesanan : {{history.status_reservasi}}</div>
              </v-card-text>
            </v-card>
            <v-card v-else-if="history.status_reservasi === 'checkin'" class="elevation-2">
              <v-card-title class="headline">Berhasil Check-in</v-card-title>
              <v-card-text>
                        <div>ID Pemesan : {{history.reserv_id}}</div>
                        <div>Nama Pemesan : {{history.nama}}</div>
                        <div>Total Biaya Pemesanan : Rp.{{history.total}}</div>
                        <div>Lama Sewa : {{history.sewa}} hari</div>
                        <div>Tanggal Check-in : {{history.checkin}}</div>
                        <div>Status Pemesanan : {{history.status_reservasi}}</div>
              </v-card-text>
            </v-card>
            <v-card v-else-if="history.status_reservasi === 'checkout'" class="elevation-2">
              <v-card-title class="headline">Berhasil Check-Out</v-card-title>
              <v-card-text>
                        <div>ID Pemesan : {{history.reserv_id}}</div>
                        <div>Nama Pemesan : {{history.nama}}</div>
                        <div>Total Biaya Pemesanan : Rp.{{history.total}}</div>
                        <div>Lama Sewa : {{history.sewa}} hari</div>
                        <div>Tanggal Check-in : {{history.checkin}}</div>
                        <div>Status Pemesanan : {{history.status_reservasi}}</div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
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
.history.complete {
  color :  green;
}
.history.diproses {
  border-left : 4px solid orange;
}
.history.expired {
  border-left : 4px solid red;
}
.v-btn.complete {
  color :  green;
}
.v-timeline-item.diproses {
  background:  orange;
}
.v-timeline-item.expired {
  background :  red;
}
</style>