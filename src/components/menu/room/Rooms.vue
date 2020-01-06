<template>
  <div class="rooms">
      <v-container class="my-5">
        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" top color="success">
          <span>Data berhasil ditambahkan</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbar2" top color="alert">
          <span>Data ruang berhasil dihapus</span>
          <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
        </v-snackbar>
          <!-- Sort data + tooltip -->
           <v-row class="mb-3">
            <v-tooltip top>
            <template v-slot:activator="{on}">
                <v-btn small text color="grey" @click="sortByB('title')" v-on="on">
                <v-icon left small>mdi-folder</v-icon>
                <span class="caption text-lowercase">By room name</span>
            </v-btn>
            </template>
            <span>Sort rooms by room name</span>
            </v-tooltip>
            
            <v-tooltip top>
                <template v-slot:activator="{on}">
                <v-btn small text color="grey" @click="sortByA('status')" v-on="on">
                <v-icon left small>mdi-calendar-clock</v-icon>
                <span class="caption text-lowercase">By Status</span>
            </v-btn>
                </template>
                <span>Sort rooms by status</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <Popup @roomAdded="snackbar=true" />
           </v-row>
          <!-- Grid data with chip -->
          <v-card flat class="pa-3" v-for="room in paginatedArticles" :key="room.id">
              <v-row wrap :class="`pa-3 room ${room.status}`">
                  <v-col cols="12" md="2">
                      <div class="caption grey--text">Nama Ruangan</div>
                      <div>{{room.title}}</div>
                  </v-col>
                  <v-col cols="6" md="2">
                      <div class="caption grey--text">Harga/Hari</div>
                      <div>{{room.harga}}</div>
                  </v-col>
                  <v-col cols="6" md="2">
                      <div class="caption grey--text">Fitur</div>
                      <div>{{room.deskripsi}}</div>
                  </v-col>
                  <v-col cols="6" md="2">
                      <div class="caption grey--text">Gambar</div>
                      <div class="justify-end"><v-img aspect-ratio="1" :src="room.image"></v-img></div>
                  </v-col>
                  <v-col cols="6" md="2">
                        <div class="caption grey--text">Status</div>
                        <div justify="space-between">
                            <v-chip small :color="`${room.status}`" :class="`v-chip--active white--text caption my-2`">{{room.status}}</v-chip>
                        </div>
                  </v-col>
                  <v-col cols="6" md="2">
                        <div class="caption grey--text">Aksi</div>
                        <div justify="space-between">
                                              
                    <Edit :room="room" @roomEdit="snackbar=true"/>
                    <Delete :room="room" @deleteRoom="snackbar2=true"/>
                    </div>
                  </v-col>
              </v-row>
            <v-divider></v-divider>
          </v-card>
          <!-- Pagination start here -->
          <v-row align-center>
            <v-col cols="3">
              <v-btn
                v-if="page !== 1"
                class="ml-0"
                title="Previous page"
                small
                color="primary"
                v-bind="$attrs"
                v-on="$listeners"
                square
                @click="page--"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-col>

            <v-col
              cols="6"
              class="text-center subtitle-1"
            >
              PAGE {{ page }} OF {{ pages }}
            </v-col>

            <v-col
              cols="3"
              class="text-right"
            >
              <v-btn
                v-if="pages > 1 && page < pages"
                class="mr-0"
                title="Next page"
                small
                color="primary"
                v-bind="$attrs"
                v-on="$listeners"
                square
                @click="page++"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
      </v-container>
  </div>
</template>
 
<script>

import Edit from '../room/edit/EditRoomDetails'
import Popup from '../room/AddRoom'
import Delete from '../room/delete/DeleteRooms'

export default {
  components: {Popup, Edit, Delete},
    data: () => ({
      page: 1,
      snackbar: false,
      snackbar2: false
    }),
    // sort method
    methods:{
        sortByA(prop){
      this.rooms.sort((a,b) => a[prop] < b[prop] ? -1:1)
    },
    sortByB(prop){
      this.rooms.sort((a,b) => a[prop] < b[prop] ? -1:1)
    },
    onLoadRoom(id){
        this.$router.push('/rooms/' + id)
      }
    },
    
    // Pagination settings
    computed: {
      rooms () {
        return this.$store.getters.featuredRooms
      },
      pages () {
        return Math.ceil(this.rooms.length / 5)
      },
      paginatedArticles () {
        const start = (this.page - 1) * 5
        const stop = this.page * 5

        return this.rooms.slice(start, stop)
      },
    },

    watch: {
      page () {
        window.scrollTo(0, 0)
      }
    },
    inheritAttrs: false,

    props: {
      square: Boolean
    },
    
}
</script>

<style>
.room.available {
  border-left : 4px solid green;
}
.room.booked {
  border-left : 4px solid orange;
}
.room.maintenance {
  border-left : 4px solid red;
}
.v-chip.available {
  background :  green;
}
.v-chip.booked {
  background:  orange;
}
.v-chip.maintenance {
  background :  red;
}
</style>