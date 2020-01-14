<template>
  <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{on}">
                      <v-chip
                      v-on="on"
                          class="text-uppercase mt-2 ml-2"
                          color="cyan"
                          label
                          small
                          dark
                        >
                      Reset
                    </v-chip>       
        </template>
        <div>
        <v-alert
            prominent
            type="error"
            color="cyan"
            >
            <v-row align="center">
                <v-col class="grow">Lakukan reset password ?</v-col>
                <v-col class="shrink">
                <v-btn text class="success" @click="submit" :loading="loading">Reset Password</v-btn>
                </v-col>
            </v-row>
            </v-alert>
        </div>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
export default {
  props: ['user'],
  data () {
    return{
        email: this.user.email,
    loading: false,
    dialog: false,
    show: false
    }    
  },
  methods: {
    submit(){
          const daftar = {
              id: this.user.id,
              email: this.user.email
          }
    this.$store.dispatch('resetKaryawan', daftar)
                   this.loading = false;
                   this.dialog = false;
                   this.$emit('resetKaryawan');
      
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