<template>
  <div class="profile">
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

      <v-btn
        color="purple"
        text
      >
        Update
      </v-btn>

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

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
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
            :value="user.no_ktp"
            label="Nomor KTP"
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
       
    </div>
</template>

<script>
export default {
data: () => ({
      show: false,
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