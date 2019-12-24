<template>
    <v-container grid-list-xs>
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
                                    <v-list-item-avatar color="grey"></v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">{{room.title}}</v-list-item-title>
                                        <v-list-item-subtitle>Harga : Rp.{{room.harga}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <template v-if="userIsCreator">
                                            <div justify="space-between">
                                                <Edit :room="room" @roomEdit="snackbar=true"/>
                                            </div>
                                        </template>
                                    </v-list-item>
                                            <div class="d-flex flex-no-wrap justify-space-between">
                                            <div>
                                                <v-card-text>
                                                    {{room.deskripsi}}
                                                </v-card-text>
                                            </div>
                                                <v-img
                                                :src="room.image"
                                                height="194"
                                                max-width="300"
                                                class="mr-1"
                                                ></v-img>
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
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-heart</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-share-variant</v-icon>
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <!-- Gallery ruangan -->
                        <v-col cols="12" sm="4">
                            <v-card>
                                <v-container fluid>
                                <v-row>
                                    <v-col
                                    v-for="n in 4"
                                    :key="n"
                                    class="d-flex child-flex"
                                    cols="6"
                                    >
                                    <v-card flat tile class="d-flex">
                                        <v-img
                                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                        aspect-ratio="1"
                                        class="grey lighten-2"
                                        
                                        >
                                        <template v-slot:placeholder>
                                            <v-row
                                            class="fill-height ma-0"
                                            align="center"
                                            justify="center"
                                            >
                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>
                                        </v-img>
                                    </v-card>
                                    </v-col>
                                </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
        
    </v-container>
</template>

<script>
import Edit from '../room/edit/EditRoomDetails'
export default {
    components:{Edit},
    data: () => ({
        image:true,
        snackbar: false,
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

<style>

</style>