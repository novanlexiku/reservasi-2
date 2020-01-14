<template>
  <v-dialog max-width="800px" v-model="dialog">
        <template v-slot:activator="{on}">
                    <v-btn
                    v-if="history.status_reservasi == 'menunggu'"
                        v-on="on"
                        color="secondary"
                        class="mt-2"
                        outlined
                        disabled
                    >
                        Menunggu Konfirmasi
                    </v-btn>
                    <v-btn
                    v-else
                        v-on="on"
                        color="secondary"
                        class="mt-2"
                        outlined
                    >
                        Konfirmasi
                    </v-btn>
        </template>
      <v-card>
            <v-card-title>
                <h4>Konfirmasi Pembayaran</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form" @submit.prevent="submit">
                    <v-text-field label="Nama Ruangan" v-model="nama" prepend-icon="mdi-account" outlined readonly></v-text-field>
                    <v-text-field label="Total Harga" v-model="total" prefix="Rp." prepend-icon="mdi-wallet" outlined readonly></v-text-field>
                    <v-btn raised class="primary ml-8" @click="onPickFile">Upload Image</v-btn>
                    <input
                      type="file"
                      ref="fileInput"
                      style="display:none"
                      accept="image/*"
                      @change="onFilePicked">
                    <div class="ml-8">
                    <img height="200" width="300" :src="imageUrl" >
                    </div>
                    <v-btn text class="success ml-8 mt-3" type="submit" :loading="loading">konfirmasi</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props:['history'],
  data () {
      return {
        nama: this.history.nama,
        total: this.history.total,
        status_reservasi: 'menunggu',
        status_konfirmasi: 'menunggu',
        image:null,
        imageUrl:'',
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
    submit(){
      if(this.$refs.form.validate()){
          this.loading = true
          if (!this.image){
            return
          }
          const konfirmasi = {
              reservasi_id: this.history.id,
              nama: this.nama,
              total: this.total,
              image: this.image,
              checkin: this.history.checkin,
              status_reservasi: this.status_reservasi,
              status_konfirmasi: this.status_konfirmasi

          }
      this.$store.dispatch('konfirmasiReservasi', konfirmasi)
      this.loading = false;
      this.dialog = false;
      this.$emit('konfirmasi');
      }
    },
    onPickFile () {
        this.$refs.fileInput.click()
      },
    onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]        

      }
  },

}
</script>

<style>

</style>