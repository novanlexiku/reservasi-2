<template>
  <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{on}">
                <v-btn small text v-on="on" color="grey">
                    <span class="subtitle-2">Tambah Karyawan</span>
                    <v-icon right small>mdi-plus-box</v-icon>
                </v-btn>        
        </template>
      <v-card>
            <v-card-title>
                <h4>Tambah Karyawan</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Nama" v-model="nama" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
                    <v-text-field label="No Ktp" v-model="no_ktp" prepend-icon="mdi-information" :rules="inputRules"></v-text-field>
                    <v-text-field label="Telepon" v-model="no_hp" prepend-icon="mdi-cellphone" :rules="inputRules"></v-text-field>
                    <v-text-field label="Email" v-model="email" prepend-icon="mdi-email" :rules="emailRules"></v-text-field>
                    <v-text-field label="Password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    v-model="password"
                    id="password1" prepend-icon="mdi-textbox-password" 
                    :rules="inputRules"></v-text-field>

                    <v-text-field label="Confirm Password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    v-model="confirmPassword"
                    id="password2" prepend-icon="mdi-textbox-password" 
                    ></v-text-field>                    <v-menu ref="menu" :close-on-content-click="false" :return-value.sync="tgllhr"
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
                    <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading">Tambah</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
export default {
  data: () => ({
    nama: '',
    no_ktp: '',
    email: '',
    tgllhr:null,
    role: 'karyawan',
    alamat: '',
    password: '',
    confirmPassword:'',
    no_hp: '',
    image: 'https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/users%2FAvatar%2FKaryawan1.png?alt=media&token=e3e7a1a3-63b5-4570-a4ad-d0c3295257ce',
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
    show: false,
    show2: false,
  }),
  methods: {
    submit(){
      if(this.$refs.form.validate()){
          this.loading = true;
          const daftar = {
              nama: this.nama,
              no_ktp: this.no_ktp,
              email: this.email,
              tgllhr: this.tgllhr,
              role: this.role,
              alamat: this.alamat,
              image: this.image,
              password: this.password,
              no_hp: this.no_hp
          }
    this.$store.dispatch('tambahKaryawan', daftar)
                   this.loading = false;
                   this.dialog = false;
                   this.$emit('tambahKaryawan');
                   this.$refs.form.reset();
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