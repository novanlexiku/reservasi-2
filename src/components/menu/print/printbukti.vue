<template>
<v-dialog max-width="400" v-model="dialog">
        <template v-slot:activator="{on}" v-if="history.status_reservasi === 'complete'">
                    <v-btn
                          v-on="on"
                          color="success"
                          class="mx-0"
                          outlined
                        >
                          Detail
                        </v-btn>
        </template>
        <template v-slot:activator="{on}" v-else-if="history.status_reservasi === 'diproses'">
                    <v-btn
                          v-on="on"
                          color="red lighten-2"
                          class="mx-0"
                          outlined
                        >
                          Detail
                        </v-btn>
        </template>
        <template v-slot:activator="{on}" v-else-if="history.status_reservasi === 'menunggu'">
                    <v-btn
                          v-on="on"
                          color="purple darken-1"
                          class="mx-0"
                          outlined
                        >
                          Detail
                        </v-btn>
        </template>
        <template v-slot:activator="{on}" v-else-if="history.status_reservasi === 'checkin'">
                    <v-btn
                          v-on="on"
                          color="indigo"
                          class="mx-0"
                          outlined
                        >
                          Detail
                        </v-btn>
        </template>
        <template v-slot:activator="{on}" v-else-if="history.status_reservasi === 'checkout'">
                    <v-btn
                          v-on="on"
                          color="cyan"
                          class="mx-0"
                          outlined
                        >
                          Detail
                        </v-btn>
        </template>
        <div ref="content">
        <v-card
              color="success"
              dark
              v-if="history.status_reservasi === 'complete'"
              >
                <v-card-title class="headline">Bukti Pemesanan</v-card-title>
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
                      
              </v-card>
              <v-card
              color="red lighten-2"
              dark
              v-else-if="history.status_reservasi === 'diproses'"
              >
                <v-card-title class="headline">Bukti Pemesanan</v-card-title>
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
                      
              </v-card>
              <v-card
              color="purple darken-1"
              dark
              v-else-if="history.status_reservasi === 'menunggu'"
              >
                <v-card-title class="headline">Bukti Pemesanan</v-card-title>
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
                      
              </v-card>
              <v-card
              color="indigo"
              dark
              v-else-if="history.status_reservasi === 'checkin'"
              >
                <v-card-title class="headline">Bukti Pemesanan</v-card-title>
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
                      
              </v-card>
                <v-card
                color="cyan"
                min-width="200"
                dark
                v-else-if="history.status_reservasi === 'checkout'"
                >
                <v-card-title class="headline">Bukti Pemesanan</v-card-title>
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
                </v-card>
                </div>
                            <v-btn
                            v-if="history.status_reservasi === 'complete'"
                            color="success"
                            dark
                            @click.native="print"
                            >
                            Cetak
                            </v-btn>
                            <v-btn
                            v-else-if="history.status_reservasi === 'diproses'"
                            color="red lighten-2"
                            dark
                            @click.native="print"
                            >
                            Cetak
                            </v-btn>
                            <v-btn
                            v-else-if="history.status_reservasi === 'menunggu'"
                            color="purple darken-1"
                            dark
                            @click.native="print"
                            >
                            Cetak
                            </v-btn>
                            <v-btn
                            v-else-if="history.status_reservasi === 'checkin'"
                            color="indigo"
                            dark
                            @click.native="print"
                            >
                            Cetak
                            </v-btn>
                            <v-btn
                            v-else-if="history.status_reservasi === 'checkout'"
                            color="cyan"
                            dark
                            @click.native="print"
                            >
                            Cetak
                            </v-btn>
   
    </v-dialog>
</template>

<script>
import jsPDF from 'jspdf'
// import html2canvas from "html2canvas"

export default {
  props:['history'],
  data () {
      return {
       
        // Rules input + rules date
        inputRules:[
                v => !!v || 'Input is required',
                v => (v && v.length >= 3) || 'Input must be more than 3 characters',
                ],
        imageRules: [
            value => !value || value.size < 10000000 || 'Image size should be less than 10 MB!',
          ],
        loading: false,
        dialog: false,
      }
    },
  computed:{

  },
  methods: {
    print() {
    let tanggal = this.history.checkin
    let pdfName = 'bukti pemesanan' + tanggal
    
    
    const doc = new jsPDF();
    const contentHtml = this.$refs.content.innerHTML
    doc.fromHTML(contentHtml, 10, 10, {
      width: 400
    })
    doc.text('----------------------------------------',10,25)
    doc.save(pdfName + '.pdf')
    
  
    this.dialog = false
    }
  },

}
</script>

<style>

</style>