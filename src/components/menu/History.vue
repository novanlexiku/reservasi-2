<template>
  <div class="history">
<!-- Expansion Panel -->
  <v-container grid-list-sm>
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
      <v-card-text>
        <v-container fluid>
            <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item
              v-for="history in historys" :key="history.nama"
              fill-dot
              color="red lighten-2"
            >
              <v-card
              color="success"
              dark
              v-if="history.status_reservasi === 'complete'"
              >
                <v-card-title class="headline">Pembayaran Selesai</v-card-title>
                <v-divider></v-divider>
                      <v-card-text class="white text--primary">
                      <strong>ID Pemesan : </strong>{{history.reserv_id}}
                      <br>
                      <strong>Nama Pemesan : </strong>{{history.nama}}
                      <br>
                      <strong>Total Biaya Pemesanan : </strong>{{history.total|toCurrency}}
                      <br>
                      <strong>Lama Sewa : </strong>{{history.sewa}} hari
                      <br>
                      <strong>Tanggal Check-in : </strong>{{history.checkin}}
                      <br>
                      <strong>Status Pemesanan : </strong>{{history.status_reservasi}}
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text class="white text--primary">
                        <print :history="history"></print>
                      </v-card-text>
              </v-card>
              <v-card
              color="red lighten-2"
              dark
              v-else-if="history.status_reservasi === 'diproses'"
              >
                <v-card-title class="headline">Lakukan Konfirmasi</v-card-title>
                <v-divider></v-divider>
                      <v-card-text class="white text--primary">
                      <strong>ID Pemesan : </strong>{{history.reserv_id}}
                      <br>
                      <strong>Nama Pemesan : </strong>{{history.nama}}
                      <br>
                      <strong>Total Biaya Pemesanan : </strong>{{history.total|toCurrency}}
                      <br>
                      <strong>Lama Sewa : </strong>{{history.sewa}} hari
                      <br>
                      <strong>Tanggal Check-in : </strong>{{history.checkin}}
                      <br>
                      <strong>Status Pemesanan : </strong>{{history.status_reservasi}}
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text class="white text--primary">
                        <print :history="history"></print>
                      </v-card-text>
              </v-card>
              <v-card
              color="purple darken-1"
              dark
              v-else-if="history.status_reservasi === 'menunggu'"
              >
                <v-card-title class="headline">Menunggu Konfirmasi</v-card-title>
                <v-divider></v-divider>
                      <v-card-text class="white text--primary">
                      <strong>ID Pemesan : </strong>{{history.reserv_id}}
                      <br>
                      <strong>Nama Pemesan : </strong>{{history.nama}}
                      <br>
                      <strong>Total Biaya Pemesanan : </strong>{{history.total|toCurrency}}
                      <br>
                      <strong>Lama Sewa : </strong>{{history.sewa}} hari
                      <br>
                      <strong>Tanggal Check-in : </strong>{{history.checkin}}
                      <br>
                      <strong>Status Pemesanan : </strong>{{history.status_reservasi}}
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text class="white text--primary">
                        <print :history="history"></print>
                      </v-card-text>
              </v-card>
              <v-card
              color="indigo"
              dark
              v-else-if="history.status_reservasi === 'checkin'"
              >
                <v-card-title class="headline">Berhasil Check-In</v-card-title>
                <v-divider></v-divider>
                      <v-card-text class="white text--primary">
                      <strong>ID Pemesan : </strong>{{history.reserv_id}}
                      <br>
                      <strong>Nama Pemesan : </strong>{{history.nama}}
                      <br>
                      <strong>Total Biaya Pemesanan : </strong>{{history.total|toCurrency}}
                      <br>
                      <strong>Lama Sewa : </strong>{{history.sewa}} hari
                      <br>
                      <strong>Tanggal Check-in : </strong>{{history.checkin}}
                      <br>
                      <strong>Status Pemesanan : </strong>{{history.status_reservasi}}
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text class="white text--primary">
                      <print :history="history"></print>
                      </v-card-text>
              </v-card>
              <v-card
              color="cyan"
              min-width="200"
              dark
              v-else-if="history.status_reservasi === 'checkout'"
              >
                <v-card-title class="headline">Berhasil Check-Out</v-card-title>
                <v-divider></v-divider>
                      <v-card-text class="white text--primary">
                      <strong>ID Pemesan : </strong>{{history.reserv_id}}
                      <br>
                      <strong>Nama Pemesan : </strong>{{history.nama}}
                      <br>
                      <strong>Total Biaya Pemesanan : </strong>{{history.total|toCurrency}}
                      <br>
                      <strong>Lama Sewa : </strong>{{history.sewa}} hari
                      <br>
                      <strong>Tanggal Check-in : </strong>{{history.checkin}}
                      <br>
                      <strong>Status Pemesanan : </strong>{{history.status_reservasi}}
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text class="white text--primary">
                        <print :history="history"></print>
                      </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
  </div>
</template>

<script>
import print from '../menu/print/printbukti'
export default {
    components: {print},
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