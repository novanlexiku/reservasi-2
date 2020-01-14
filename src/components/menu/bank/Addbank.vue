<template>
  <v-dialog max-width="800px" v-model="dialog">
        <template v-slot:activator="{on}">
            <v-btn small text v-on="on" color="grey">
                <span class="subtitle-2">Tambah Bank</span>
                <v-icon right small>mdi-plus-box</v-icon>
            </v-btn>
        </template>
      <v-card>
            <v-card-title>
                <h4>Tambah Bank</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form" @submit.prevent="submit">
                    <v-text-field label="Nama Bank" v-model="title" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
                    <v-text-field label="Nomor Rekening" v-model="rekening" prepend-icon="mdi-wallet" :rules="inputRules"></v-text-field>
                    <v-textarea label="Atas Nama" v-model="nama" prepend-icon="mdi-border-color" :rules="inputRules"></v-textarea>
                    <v-btn text class="success mx-0 mt-3" type="submit" :loading="loading">Tambah Bank</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
  data: () => ({
    title: '',
    rekening: '',
    status: 'available',
    nama: '',
    // Rules input + rules date
    inputRules:[
            v => !!v || 'Input is required',
            v => (v && v.length >= 3) || 'Input must be more than 3 characters',
            ],
            
    loading: false,
    dialog: false,
  }),
  computed:{

  },
  methods: {
    submit(){
      if(this.$refs.form.validate()){
          this.loading = true;
          const bank = {
              title: this.title,
              rekening: this.rekening,
              status: this.status,
              nama: this.nama,
          }
      this.$store.dispatch('createBank', bank)
      this.loading = false;
      this.dialog = false;
      this.$emit('bankAdded');
      this.$refs.form.reset();
      }
    },
    
  },

}
</script>

<style>

</style>