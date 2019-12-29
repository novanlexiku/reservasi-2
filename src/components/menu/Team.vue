<template>
  <div class="team">
      <h1 class="ma-2 subtitle-1 grey--text">Staff kami</h1>

      <v-container class="my-5">
        <!-- Card profil team -->
        <v-row no-gutters>
          <v-col cols="12" md="3" v-for="person in users" :key="person.nama">
            <v-card flat class="text-center ma-3">
              <v-responsive class="pt-4">
                <v-avatar size="100" class="grey lighten-2">
                <v-img :src="person.image"></v-img>
                </v-avatar>
              </v-responsive>
              <v-card-text>
                <div class="headline bold">{{person.nama}}</div>
                <div class="grey--text">{{person.role}}</div>
              </v-card-text>
              <v-card-actions>
              <v-btn text color="grey">
                <v-icon small left>mdi-message</v-icon>
                <span>Message</span>
              </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>


  </div>
</template>

<script>
export default {
  data: () => ({
    
  }),
  computed: {
      users () {
        return this.$store.getters.loadedKaryawan
      },
    },
}
</script>

<style>

</style>