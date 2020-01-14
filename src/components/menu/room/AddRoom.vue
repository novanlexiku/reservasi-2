<template>
  <v-dialog max-width="800px" v-model="dialog">
        <template v-slot:activator="{on}">
            <v-btn small text v-on="on" color="grey">
                <span class="subtitle-2">Tambah Ruangan</span>
                <v-icon right small>mdi-plus-box</v-icon>
            </v-btn>
        </template>
      <v-card>
            <v-card-title>
                <h4>Tambah Ruangan</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form" @submit.prevent="submit">
                    <v-text-field label="Nama Ruangan" v-model="title" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
                    <v-text-field label="Harga/Hari" v-model="harga" prefix="Rp." prepend-icon="mdi-wallet" :rules="inputRules"></v-text-field>
                    <v-select
                      :items="items"
                      item-text="text"
                      item-value="value"
                      label="Jenis Ruangan"
                      v-model="jenis"
                      bottom
                      autocomplete
                      prepend-icon="mdi-home"
                    ></v-select>
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
                    <v-textarea label="Spesifikasi" v-model="deskripsi" prepend-icon="mdi-border-color" :rules="inputRules"></v-textarea>
                    <v-btn text class="success mx-0 mt-3" type="submit" :loading="loading">Tambah Ruangan</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  data: () => ({
    items: [{text: 'Standar',value: 'Standar'},
            {text: 'Family',value: 'Family'},
            {text: 'Deluxe',value: 'Deluxe'}
            ],
    title: '',
    harga: '',
    status: 'available',
    deskripsi: '',
    jenis: '',
    image:null,
    imageUrl:'',
    prominent: false,
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
  }),
  computed:{

  },
  methods: {
    submit(){
      if(this.$refs.form.validate()){
          this.loading = true
          if (!this.image){
            return
          }
          const room = {
              title: this.title,
              harga: this.harga,
              status: this.status,
              deskripsi: this.deskripsi,
              jenis: this.jenis,
              image: this.image,
              prominent: this.prominent
          }
      this.$store.dispatch('createRoom', room)
      this.loading = false;
      this.dialog = false;
      this.imageUrl = null;
      this.$emit('roomAdded');
      this.$refs.form.reset();
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