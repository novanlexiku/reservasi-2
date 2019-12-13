<template>
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
                                        <v-list-item-subtitle>Harga : Rp.{{room.harga}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>
                                            <div class="d-flex flex-no-wrap justify-space-between" >
                                            <v-card-text width="300">
                                                <!-- form checkin -->
                                            <v-form class="px-3" ref="form">
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
                                                </v-form> 
                                            </v-card-text>
                                                <v-img
                                                :src="require(`@/assets/articles/${room.image}`)"
                                                height="200"
                                                max-width="400"
                                                class="mr-1 mb-1"
                                                ></v-img>
                                            </div>
                                </v-card>
                            </v-col>
        <v-btn
          color="primary"
          class="ml-3"
          @click="e1 = 2"
        >
          Selanjutnya
        </v-btn>

        <v-btn text class="ml-3" router to="/">Batal</v-btn>
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
                                        <v-list-item-title class="headline">{{room.title}}</v-list-item-title>
                                        <v-list-item-subtitle>Harga : Rp.{{room.harga}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>
                                            <div class="d-flex flex-no-wrap justify-space-between" >
                                            <v-card-text width="300">
                                                <!-- form checkin -->
                                            <v-form class="px-3" ref="form">
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
                                                </v-form> 
                                            </v-card-text>
                                                <v-img
                                                :src="require(`@/assets/articles/${room.image}`)"
                                                height="200"
                                                max-width="400"
                                                class="mr-1 mb-1"
                                                ></v-img>
                                            </div>
                                </v-card>
                            </v-col>
        <v-btn
          color="primary"
          class="ml-3"
          @click="e1 = 3"
        >
          Selanjutnya
        </v-btn>

        <v-btn text @click="e1 = 1" class="ml-3">Kembali</v-btn>
      </v-stepper-content>
        <!-- Stepper 3 -->
      <v-stepper-content step="3">
        <!-- Deskripsi Ruangan -->
                            <v-col cols="12" sm="12">
                                <v-card
                                >
                                    <v-list-item>
                                    <v-list-item-avatar color="grey"></v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">{{room.title}}</v-list-item-title>
                                        <v-list-item-subtitle>Harga : Rp.{{room.harga}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>
                                            <div class="d-flex flex-no-wrap justify-space-between" >
                                            <v-card-text width="300">
                                                <!-- form checkin -->
                                            <v-form class="px-3" ref="form">
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
                                                </v-form> 
                                            </v-card-text>
                                                <v-img
                                                :src="require(`@/assets/articles/${room.image}`)"
                                                height="200"
                                                max-width="400"
                                                class="mr-1 mb-1"
                                                ></v-img>
                                            </div>
                                </v-card>
                            </v-col>

        <v-btn
          color="primary"
          class="ml-3"
          
        >
          Complete
        </v-btn>

        <v-btn text @click="e1 = 2" class="ml-3">Kembali</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
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
        role: 'pelanggan',
        alamat: '',
        // Rules input + rules date
        inputRules:[
                v => !!v || 'Input is required',
                v => (v && v.length >= 3) || 'Input must be more than 3 characters',
                ],
        dateRules:[
                v => !!v || 'Date is required'
                ],
        }
    },
    props:['id'],
    computed:{
    // panggil data ruangan
    room (){
        return this.$store.getters.loadedRoom(this.id)
    },
    formattedDate(){
            return this.checkin ? format(parseISO(this.checkin), 'do MMM yyyy') : ''
        }
},
  }
</script>