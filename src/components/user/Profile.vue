<template>
  <div class="profile">
    <v-container grid-list-sm>
      <!-- snackbar -->
      <v-snackbar v-model="snackbar" top color="success">
          <span>Data Pengguna Berhasil di Update</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbar2" top color="cyan">
          <span>Silahkan cek email untuk mereset password</span>
          <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
        </v-snackbar>
        <!-- Komponen Card -->
      <v-card
    class="mx-auto"
    max-width="700"
    tile
  >
    <v-img
      src="@/assets/homestay-banner.jpg"
              height="300"
    >
    <v-row
                align="end"
                class="fill-height"
              >
                <v-col
                  align-self="start"
                  class="pa-0"
                  cols="12"
                >
                  <v-avatar
                    class="profile"
                    color="grey"
                    size="164"
                    tile
                  >
                    <v-img :src="user.image"></v-img>
                  </v-avatar>
                </v-col>
                <v-col class="py-0">
                  <v-list-item
                    color="rgba(0, 0, 0, .4)"
                    dark
                  >
                    <v-list-item-content>
                      <v-list-item-title class="title">{{user.nama}}</v-list-item-title>
                      <v-list-item-subtitle>{{user.role}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
    </v-img>
<v-card-actions>

      <Update :user="user" @updatePengguna="snackbar=true"></Update>
      <Reset :user="user" @resetPassword="snackbar2=true"/>
      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

          <v-container>
            <v-row>
              
        <v-col cols="12" sm="6">
          <v-text-field
            :value="user.no_ktp"
            label="No KTP"
            outlined
            readonly
          ></v-text-field>
        </v-col>
            </v-row>
          </v-container>
      </div>
    </v-expand-transition>
    <v-form>
    <v-container>
      <v-row>

        <v-col cols="12" sm="6">
          <v-text-field
            :value="user.nama"
            label="Nama"
            outlined
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            :value="user.role"
            label="Role"
            outlined
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="8">
          <v-text-field
            :value="user.email"
            label="Email"
            outlined
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="8">
          <v-text-field
            :value="user.no_hp"
            label="Nomor Telepon"
            outlined
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="8">
          <v-text-field
            :value="user.tgllhr"
            label="Tanggal lahir"
            outlined
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="8">
          <v-text-field
            :value="user.alamat"
            label="Alamat"
            outlined
            readonly
          ></v-text-field>
        </v-col>

        

      </v-row>
    </v-container>
  </v-form>

    

    
  </v-card>
    </v-container>
    
       
    </div>
</template>

<script>
import Update from '../user/editprofile'
import Reset from '../user/ResetEmail'
export default {
  components:{Update, Reset},
data: () => ({
      show: false,
      snackbar:false,
      snackbar2: false
    }),

computed:{
  user(){
            return this.$store.getters.loadedUser
        },
        
}
}
</script>

<style>

</style>