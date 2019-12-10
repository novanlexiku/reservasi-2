<template>
  <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{on}">
            <v-btn small text v-on="on" color="grey">
                <span class="subtitle-2">Tambah Ruangan</span>
                <v-icon right small>mdi-plus-box</v-icon>
            </v-btn>
        </template>
      <v-card>
            <v-card-title>
                <h2>Tambah Ruangan</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Nama Ruangan" v-model="title" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
                    <v-text-field label="Harga/Hari" v-model="harga" prefix="Rp." prepend-icon="mdi-wallet" :rules="inputRules"></v-text-field>
                    <v-text-field label="Image" v-model="image" prepend-icon="mdi-camera" :rules="inputRules"></v-text-field>
                    <v-textarea label="Spesifikasi" v-model="deskripsi" prepend-icon="mdi-border-color" :rules="inputRules"></v-textarea>
                    <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading">Tambah Ruangan</v-btn>


                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
  data: () => ({
    title: '',
    harga: '',
    status: 'available',
    deskripsi: '',
    image:'',
    prominent: false,
    // Rules input + rules date
    inputRules:[
            v => !!v || 'Input is required',
            v => (v && v.length >= 3) || 'Input must be more than 3 characters',
            ],
            
    loading: false,
    dialog: false,
  }),
  methods: {
    submit(){
      // if(this.$refs.form.validate()){
      //     this.loading = true;
      //     const room = {
      //         title: this.title,
      //         harga: this.harga,
      //         status: this.status,
      //         deskripsi: this.deskripsi,
      //         image: this.image,
      //         prominent: this.prominent
      //     }
      //              this.loading = false;
      //              this.dialog = false;
      //              this.$emit('roomAdded');
      //              this.$refs.form.reset();
      // }
    },
    
  },

}
</script>

<style>

</style>