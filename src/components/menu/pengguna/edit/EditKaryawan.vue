<template>
  <v-dialog max-width="600px" v-model="dialog">
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
                <h4>Edit Karyawan</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Nama" v-model="nama" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
                    <v-text-field label="No Ktp" v-model="no_ktp" prepend-icon="mdi-information" :rules="inputRules"></v-text-field>
                    <v-text-field label="Telepon" v-model="no_hp" prepend-icon="mdi-cellphone" :rules="inputRules"></v-text-field>
                    <v-menu ref="menu" :close-on-content-click="false" :return-value.sync="tgllhr"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :rules="dateRules" :value="formattedDate"
                          label="Tanggal Lahir"
                          prepend-icon="mdi-calendar-account"
                          readonly
                          clearable
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="tgllhr" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="$refs.menu.save(tgllhr)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-textarea label="Alamat" v-model="alamat" prepend-icon="mdi-border-color" :rules="inputRules"></v-textarea>
                    <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading">Edit</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
export default {
  props: ['user'],
  data () {
    return{
    nama: this.user.nama,
    no_ktp: this.user.no_ktp,
    no_hp: this.user.no_hp,
    email: this.user.email,
    tgllhr: this.user.tgllhr,
    alamat: this.user.alamat,
    // image: 'https://i.pravatar.cc/400?img=47',
    // Rules input + rules date
    inputRules:[
            v => !!v || 'Input is required',
            v => (v && v.length >= 3) || 'Input must be more than 3 characters',
            ],
    // email rules menggunakan regex ( regular expresion)
    emailRules:[
      v => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(v) || 'Invalid e-mail.'}
    ],
    
            dateRules:[
                v => !!v || 'Date is required'
            ],
    loading: false,
    dialog: false,
    show: false
    }    
  },
  methods: {
    submit(){
      if(this.$refs.form.validate()){
          this.loading = true;
          const daftar = {
              id: this.user.id,
              nama: this.nama,
              no_ktp: this.no_ktp,
              no_hp: this.no_hp,
              email: this.email,
              tgllhr: this.tgllhr,
              alamat: this.alamat,
          }
    this.$store.dispatch('editKaryawan', daftar)
                   this.loading = false;
                   this.dialog = false;
                   this.$emit('editKaryawan');
      }
    }
  },
computed:{
        formattedDate(){
            return this.tgllhr ? format(parseISO(this.tgllhr), 'do MMM yyyy') : ''
        }
    },
}
</script>

<style>

</style>