<template>
<v-dialog max-width="400" v-model="dialog" id="print">
        <template v-slot:activator="{on}">
                    <v-btn
                          v-on="on"
                          color="cyan"
                          class="mx-0"
                          outlined
                        >
                          Detail
                        </v-btn>
        </template>
                <v-card
                color="cyan"
                min-width="200"
                dark
                >
                <v-card-title class="headline">Berhasil Check-Out</v-card-title>
                <v-divider></v-divider>
                        <div ref="content">
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
                                        </div>

                </v-card>

                            <v-btn
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
    
    let pdfName = 'bukti pemesanan'
    
    const doc = new jsPDF();
    const contentHtml = this.$refs.content.innerHTML
    doc.fromHTML(contentHtml, 10, 10, {
      width: 400
    })
    doc.text('Bukti Pemesanan',20,20)
    doc.text('----------------------------------------',10,25)
    doc.save(pdfName + '.pdf')
    
  
    this.dialog = false
    }
  },

}
</script>

<style>

</style>