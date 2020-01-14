<template>
  <v-dialog max-width="800px" v-model="dialog">
        <template v-slot:activator="{on}">
                    <v-btn
                        v-on="on"
                        color="secondary"
                        class="mt-2"
                        outlined
                    >
                        Check-Out
                    </v-btn>
        </template>
      <v-card>
            <v-card-title>
                <h4>Konfirmasi Check-Out</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form" @submit.prevent="submit">
                    <v-text-field label="Nama Ruangan" v-model="nama" prepend-icon="mdi-account" outlined readonly></v-text-field>
                    <v-text-field label="Total Harga" v-model="total" prefix="Rp." prepend-icon="mdi-wallet" outlined readonly></v-text-field>
                    <div class="ml-8">
                        <v-alert type="success">
                        Pelanggan sudah mengembalikan kunci ruangan    
                        </v-alert>
                    </div>
                    <br>
                    <v-btn text class="success ml-8 mt-3" type="submit" :loading="loading">check-out</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props:['checkout'],
  data () {
      return {
        nama: this.checkout.nama,
        total: this.checkout.total,
        status_reservasi: 'checkout',
        status:'available',
        room_id: this.checkout.room_id,
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
          
          const checkout = {
              reservasi_id: this.checkout.id,
              room_id: this.checkout.room_id,
              status: this.status,
              status_reservasi: this.status_reservasi,
          }
      this.$store.dispatch('checkout', checkout)
      this.loading = false;
      this.dialog = false;
      this.$emit('checkout');
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