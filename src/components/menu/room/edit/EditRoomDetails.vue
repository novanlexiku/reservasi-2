<template>
  <v-dialog max-width="800px" v-model="dialog">
        <template v-slot:activator="{on}">
                     <v-chip
                          v-on="on"
                          class="text-uppercase mt-2"
                          color="secondary"
                          label
                          small
                        >
                      Edit
                    </v-chip>
        </template>
      <v-card>
            <v-card-title>
                <h4>Tambah Ruangan</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form" @submit.prevent="submit">
                    <v-text-field label="Nama Ruangan" v-model="title" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
                    <v-text-field label="Harga/Hari" v-model="harga" prefix="Rp." prepend-icon="mdi-wallet" :rules="inputRules"></v-text-field>
                    <v-textarea label="Spesifikasi" v-model="deskripsi" prepend-icon="mdi-border-color" :rules="inputRules"></v-textarea>
                    <v-btn text class="success mx-0 mt-3" type="submit" :loading="loading">Edit Ruangan</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props:['room'],
  data () {
      return {
        title: this.room.title,
        harga: this.room.harga,
        deskripsi: this.room.deskripsi,
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
          const room = {
              id: this.room.id,
              title: this.title,
              harga: this.harga,
              deskripsi: this.deskripsi,
          }
      this.$store.dispatch('EditRoom', room)
      this.loading = false;
      this.dialog = false;
      this.$emit('roomEdit');
      }
    },
    
  },

}
</script>

<style>

</style>