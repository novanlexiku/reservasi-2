<template>
  <div class="banks">
      <v-container class="my-5">
        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" top color="success">
          <span>Data berhasil ditambahkan</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbar3" top color="success">
          <span>Data berhasil di update</span>
          <v-btn text color="white" @click="snackbar3 = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbar2" top color="alert">
          <span>Data Bank telah di Hapus</span>
          <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
        </v-snackbar>
          <!-- Sort data + tooltip -->
           <v-row class="mb-3">
            <v-tooltip top>
            <template v-slot:activator="{on}">
                <v-btn small text color="grey" @click="sortByB('title')" v-on="on">
                <v-icon left small>mdi-folder</v-icon>
                <span class="caption text-lowercase">By bank name</span>
            </v-btn>
            </template>
            <span>Sort banks by bank name</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <Popup @bankAdded="snackbar=true" />
           </v-row>
          <!-- Grid data with chip -->
          <v-card flat class="pa-3" v-for="bank in paginatedArticles" :key="bank.id">
              <v-row wrap :class="`pa-3 bank ${bank.status}`">
                  <v-col cols="12" md="4">
                      <div class="caption grey--text">Nama Bank</div>
                      <div>{{bank.title}}</div>
                  </v-col>
                  <v-col cols="6" md="2">
                      <div class="caption grey--text">Nomor Rekening</div>
                      <div>{{bank.rekening}}</div>
                  </v-col>
                  
                  <v-col cols="6" md="2">
                        <div class="caption grey--text">Status</div>
                        <div justify="space-between">
                            <v-chip small :color="`${bank.status}`" :class="`v-chip--active white--text caption my-2`">{{bank.status}}</v-chip>
                        </div>
                  </v-col>
                  <v-col cols="6" md="4">
                        <div class="caption grey--text">Aksi</div>
                        <div justify="space-between">
                        <Edit :bank="bank" @bankEdit="snackbar3=true"/>
                        <Delete :bank="bank" @deleteBank="snackbar2=true"/>                        
                        
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


import Popup from '../bank/Addbank'
import Edit from '../bank/edit/EditBank'
import Delete from '../bank/delete/DeleteBanks'

export default {
  components: {Popup, Edit,Delete},
    data: () => ({
      page: 1,
      snackbar: false,
      snackbar2: false,
      snackbar3: false
    }),
    // sort method
    methods:{
        sortByA(prop){
      this.banks.sort((a,b) => a[prop] < b[prop] ? -1:1)
    },
    sortByB(prop){
      this.banks.sort((a,b) => a[prop] < b[prop] ? -1:1)
    },
    
    },
    
    // Pagination settings
    computed: {
      banks () {
        return this.$store.getters.featuredBanks
      },
      pages () {
        return Math.ceil(this.banks.length / 5)
      },
      paginatedArticles () {
        const start = (this.page - 1) * 5
        const stop = this.page * 5

        return this.banks.slice(start, stop)
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
.bank.available {
  border-left : 4px solid green;
}
.bank.busy {
  border-left : 4px solid orange;
}
.bank.maintenance {
  border-left : 4px solid red;
}
.v-chip.available {
  background :  green;
}
.v-chip.busy {
  background:  orange;
}
.v-chip.maintenance {
  background :  red;
}
</style>