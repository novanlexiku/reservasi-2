<template>
  <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{on}">
                      <v-chip
                      v-on="on"
                          class="text-uppercase mt-2 ml-2"
                          color="error"
                          label
                          small
                        >
                      Delete
                    </v-chip>       
        </template>
      <v-alert
      prominent
      type="error"
    >
      <v-row align="center">
        <v-col class="grow">Yakin ingin menghapus data ?</v-col>
        <v-col class="shrink">
                    <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading">Hapus</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
export default {
  props: ['user'],
  data () {
    return{
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
    show: false
    }    
  },
  methods: {
    submit(){
          const daftar = {
              id: this.user.id,
          }
    this.$store.dispatch('deletePelanggan', daftar)
                   this.loading = false;
                   this.dialog = false;
                   this.$emit('deletePelanggan');
      
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