<template>
  <div class="reservasi">
    <v-container class="my-5">
      <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Check-In</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Konfirmasi</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Transfer</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
        <!-- Stepper 1 -->
      <v-stepper-content step="1">
                            <!-- Deskripsi Ruangan -->
                            <v-col cols="12" sm="12">
                                <v-card
                                >
                                    <v-list-item>
                                    <v-list-item-avatar color="grey"></v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">{{room.title}}</v-list-item-title>
                                        <v-list-item-subtitle>Harga : Rp.{{room.harga}} / Hari</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>
                                            <div class="d-flex flex-no-wrap justify-space-between" >
                                            <v-card-text width="300">
                                                <!-- form Checkin -->
                                            <v-form class="px-3" ref="form">
                                              <v-col cols="12" sm="6"> 
                                                <v-text-field label="Nama" v-model="nama" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" sm="6"> 
                                                <v-text-field label="No Ktp" v-model="no_ktp" prepend-icon="mdi-information" :rules="inputRules"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" sm="6"> 
                                                <v-text-field label="Telp" v-model="telp" prepend-icon="mdi-cellphone" :rules="inputRules"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" sm="6"> 
                                                <v-menu ref="menu" :close-on-content-click="false" :return-value.sync="checkin"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                        :rules="dateRules" :value="formattedDate"
                                                        label="Tanggal Check-in"
                                                        prepend-icon="mdi-calendar-account"
                                                        readonly
                                                        clearable
                                                        v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="checkin" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="$refs.menu.save(checkin)">OK</v-btn>
                                                    </v-date-picker>
                                                    </v-menu>
                                              </v-col>
                                              <v-col cols="12" sm="6"> 
                                                <v-text-field label="Lama Sewa" v-model="sewa" suffix="hari" prepend-icon="mdi-arrow-right-bold-box-outline"></v-text-field>
                                              </v-col>
                                              <v-col cols="12" sm="6"> 
                                              <v-select 
                                                      :items="banks"
                                                      v-model="bank"
                                                      label="Pilih Pembayaran"
                                                      item-text="title"
                                                      item-value="rekening"
                                                      prepend-icon="mdi-bank"
                                                      bottom
                                                      autocomplete
                                                      ></v-select>
                                              </v-col>
                                              <v-col cols="12" sm="6">
                                                    <v-text-field v-model="total"  prefix="Rp." prepend-icon="mdi-currency-usd" readonly></v-text-field>
                                                    </v-col>
                                                </v-form>
                                                <v-btn
                                                  color="primary"
                                                  class="ml-3"
                                                  @click="e1 = 2"
                                                >
                                                  Selanjutnya
                                                </v-btn>

                                                <v-btn text class="ml-3" router to="/">Batal</v-btn> 
                                            </v-card-text>
                                                <v-img
                                                :src="room.image"
                                                height="200"
                                                max-width="400"
                                                class="mr-1 mb-1"
                                                ></v-img>
                                            </div>
                                </v-card>
                            </v-col>
        
      </v-stepper-content>
        <!-- Stepper 2 -->
      <v-stepper-content step="2">
                            <!-- Deskripsi Ruangan -->
                            <v-col cols="12" sm="12">
                                <v-card
                                >
                                    <v-list-item>
                                    <v-list-item-avatar color="grey"></v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">Konfirmasi Pemesanan {{room.title}}</v-list-item-title>
                                        <v-list-item-subtitle>Harga : Rp.{{room.harga}} / Hari</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>
                                            <div class="d-flex flex-no-wrap justify-space-between" >
                                            <v-card-text width="300">
                                                <!-- konfirmasi -->
                                                <v-form class="px-3" ref="form" @submit.prevent="submit">
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field label="Nama Ruangan" v-model="room.title" prepend-icon="mdi-account" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field label="Harga" v-model="room.harga" prepend-icon="mdi-currency-usd" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field label="Nama" v-model="nama" prepend-icon="mdi-account" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field label="No Ktp" v-model="no_ktp" prepend-icon="mdi-information" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field label="Telp" v-model="telp" prepend-icon="mdi-cellphone" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field :value="formattedDate" label="Tanggal Check-in" prepend-icon="mdi-calendar-account" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field label="Lama Sewa" v-model="sewa" suffix="hari" prepend-icon="mdi-arrow-right-bold-box-outline" readonly></v-text-field>
                                                    </v-col>
                                                     <v-col cols="12" sm="6">
                                                    <v-text-field label="Transfer ke Rekening" v-model="bank" prepend-icon="mdi-bank" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field v-model="total" prefix="Rp." prepend-icon="mdi-currency-usd" readonly></v-text-field>
                                                    </v-col>
                                                <v-btn
                                                color="primary"
                                                class="ml-3"
                                                @click="e1 =3"
                                                
                                              >
                                                Selanjutnya
                                              </v-btn>
                                              <v-btn text @click="e1 = 1" class="ml-3">Kembali</v-btn>
                                              </v-form>
                                            </v-card-text>
                                                <v-img
                                                :src="room.image"
                                                height="200"
                                                max-width="400"
                                                class="mr-1 mb-1"
                                                ></v-img>
                                            </div>
                                </v-card>
                            </v-col>
        

      </v-stepper-content>
        <!-- Stepper 3 -->
      <v-stepper-content step="3">
        <!-- Deskripsi Ruangan -->
                            <v-col cols="12" sm="12">
                                <v-card
                                >
                                    
                                            <div class="d-flex flex-no-wrap justify-space-between" >
                                            <v-card-text width="300">
                                                <v-form class="px-3" ref="form" @submit.prevent="submit">
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field outlined label="Nama Ruangan" v-model="room.title" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field outlined label="Harga / hari" v-model="room.harga" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field outlined label="Nama" v-model="nama" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field outlined label="No Ktp" v-model="no_ktp" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field outlined label="Telp" v-model="telp" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field outlined :value="formattedDate" label="Tanggal Check-in" readonly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field outlined label="Lama Sewa" v-model="sewa" suffix="hari" readonly></v-text-field>
                                                    </v-col>
                                                     <v-col cols="12" sm="6">
                                                    <v-text-field outlined label="Transfer ke Rekening" v-model="bank" donly></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                    <v-text-field outlined v-model="total" prefix="Rp." readonly></v-text-field>
                                                    </v-col>
                                                <v-btn
                                                  color="primary"
                                                  class="ml-3"
                                                  type="submit" :loading="loading"
                                                >
                                                  Complete
                                                </v-btn>

                                                <v-btn text @click="e1 = 2" class="ml-3">Kembali</v-btn>
                                              </v-form>
                                            </v-card-text>
                                            <v-card
                                              class="mr-1 mb-1"
                                              width="400"
                                              height="250"
                                              >
                                              <v-card-text>
                                                <div>Pemesanan</div>
                                                <p class="display-1 text--primary">
                                                  {{room.title}}
                                                </p>
                                                <p> Atas Nama : {{this.nama}}</p>
                                                <div class="text--primary">
                                                  Lakukan pembayaran ke <br>
                                                  No. Rekening {{this.bank}}
                                                </div>
                                              </v-card-text>
                                              <v-card-actions>
                                                <v-btn
                                                  text
                                                  color="deep-purple accent-4"
                                                >
                                                  Learn More
                                                </v-btn>
                                              </v-card-actions>
                                            </v-card>
                                            </div>
                                            
                                            
                                </v-card>

                            </v-col>
                            
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
    </v-container>
  </div>
  
</template>
<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
  export default {
    data () {
      return {
        
        e1: 0,
        
        nama: '',
        no_ktp: '',
        telp: '',
        checkin:null,
        status: 'booked',
        bank:null,
        sewa: '',
        total: '',
        // Rules input + rules date
        inputRules:[
                v => !!v || 'Input is required',
                v => (v && v.length >= 3) || 'Input must be more than 3 characters',
                ],
        dateRules:[
                v => !!v || 'Date is required'
                ],
        loading: false,
        }
    },
    watch:{
    
    sewa(newVal){
      this.total = newVal * this.room.harga
    },
    
  },
    props:['id'],
    computed:{
    // panggil data ruangan
    room (){
        return this.$store.getters.loadedRoom(this.id)
    },
    // panggil data bank
    banks (){
        return this.$store.getters.loadedBanks
    },
    reserv (){
      return this.$store.getters.loadedReserv
      
    },
    formattedDate(){
            return this.checkin ? format(parseISO(this.checkin), 'do MMM yyyy') : ''
        },
    
},

methods: {
    submit(){
      if(this.$refs.form.validate()){
          this.loading = true;
          const reservasi = {
              id: this.id,
              nama: this.nama,
              no_ktp: this.no_ktp,
              telp: this.telp,
              checkin: this.checkin,
              status: this.status,
              bank: this.bank,
              sewa: this.sewa,
              total: this.total
          }
          
      this.$store.dispatch('createReservasi', reservasi)
      this.loading = false;
      this.dialog = false;
      this.$router.push('/');
      this.$refs.form.reset();
      }
    },
    
  },
  
  }
</script>