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
                <h4>Edit Bank</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form" @submit.prevent="submit">
                    <v-text-field label="Nama Bank" v-model="title" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
                    <v-text-field label="Nomor Rekening" v-model="rekening" prepend-icon="mdi-wallet" :rules="inputRules"></v-text-field>
                    <v-textarea label="Atas Nama" v-model="nama" prepend-icon="mdi-border-color" :rules="inputRules"></v-textarea>
                    <v-btn text class="success mx-0 mt-3" type="submit" :loading="loading">Edit Bank</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    props:['bank'],
  data () {
      return {
        title: this.bank.title,
        rekening: this.bank.rekening,
        nama: this.bank.nama,
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
          this.loading = true;
          const bank = {
              id: this.bank.id,
              title: this.title,
              rekening: this.rekening,
              nama: this.nama,
          }
      this.$store.dispatch('editBank', bank)
      this.loading = false;
      this.dialog = false;
      this.$emit('bankEdit');
      }
    },
    
  },

}
</script>

<style>

</style>