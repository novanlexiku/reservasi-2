<template>
  <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{on}">
                        <v-btn
                            v-on="on"
                            color="purple"
                            text
                        >
                            Reset Password
                        </v-btn>     
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
          const user = {
                id: this.user.id,
                email: this.user.email
                }
                this.$store.dispatch('resetPassword', user)
                   this.loading = false;
                   this.dialog = false;
                   this.$emit('resetPassword');
      
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