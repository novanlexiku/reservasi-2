<template>
    <v-container grid-list-sm>
        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" top color="success">
          <span>Data berhasil ditambahkan</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
                
                        <v-row>
                            <!-- Deskripsi Ruangan -->
                            <v-col cols="12" sm="8">
                                <v-card
                                max-width="700"
                                >
                                    <v-list-item>
                                    <v-list-item-content>
                                        <v-dialog
                                                v-model="dialog"
                                                max-width="700"
                                                >
                                                <template v-slot:activator="{ on }">
                                                <v-img
                                                :src="room.image"
                                                height="194"
                                                max-width="300"
                                                class="mx-1"
                                                v-on="on"
                                                ></v-img>
                                                </template>
                                                <v-carousel hide-delimiters>
                                                    <v-carousel-item
                                                    :src="room.image"
                                                    >
                                                    <v-btn
                                                            dark
                                                            icon
                                                            @click="dialog = false"
                                                        >
                                                        <v-icon>mdi-close</v-icon>
                                                        </v-btn>
                                                    </v-carousel-item>
                                                    <v-carousel-item
                                                    :src="room.image"
                                                    >
                                                    <v-btn
                                                            dark
                                                            icon
                                                            @click="dialog = false"
                                                        >
                                                        <v-icon>mdi-close</v-icon>
                                                        </v-btn>
                                                    </v-carousel-item>
                                                </v-carousel>
                                                </v-dialog>
                                        <v-list-item-title class="headline">{{room.title}}</v-list-item-title>
                                        <v-list-item-subtitle>
                                        <v-chip class="v-chip--active white--text caption my-2"
                                        color="primary darken-3"
                                        small>{{room.harga|toCurrency}}</v-chip>
                                        </v-list-item-subtitle>
                                        <v-divider class="mx-2"></v-divider>
                                    </v-list-item-content>
                                    </v-list-item>
                                            <div class="d-flex flex-no-wrap justify-space-between">
                                            <div>
                                                <v-card-text>
                                                    {{room.deskripsi}}
                                                </v-card-text>
                                            </div>
                                            </div>
                                    <v-card-actions>
                                    <v-btn
                                    v-if="room.status === 'available'"
                                        text
                                        color="primary accent-4"
                                        @click="onLoadRoom(room.id)"
                                    >
                                        Pesan Sekarang
                                    </v-btn>
                                    <v-btn
                                    v-else
                                    disabled
                                        text
                                        color="primary accent-4"
                                        @click="onLoadRoom(room.id)"
                                    >
                                        Tidak Tersedia
                                    </v-btn>                                    
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                    </v-row>
        
    </v-container>
</template>

<script>
export default {
    data: () => ({
        image:true,
        snackbar: false,
        dialog:false,
    }),
    props:['id'],
computed:{
    // panggil data ruangan
    room (){
        return this.$store.getters.loadedRoom(this.id)
    },
    userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.room.creatorId
      },
},
methods:{
    showImage(){
    this.image = false
    },
    onLoadRoom(id){
        this.$router.push('/rooms/' + id + '/reservasi')
      }
      
}

}

</script>
