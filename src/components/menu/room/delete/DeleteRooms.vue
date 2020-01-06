<template>
  <v-dialog max-width="800px" v-model="dialog">
        <template v-slot:activator="{on}">
                     <v-chip
                          v-on="on"
                          class="text-uppercase mt-2 ml-2"
                          color="warning"
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
export default {
  props:['room'],
  data () {
      return {
        // Rules input + rules date
        inputRules:[
                v => !!v || 'Input is required',
                v => (v && v.length >= 3) || 'Input must be more than 3 characters',
                ],
        imageRules: [
            value => !value || value.size < 10000000 || 'Image size should be less than 10 MB!',
          ],
        loading: false,
        dialog: false,
      }
    },
  computed:{

  },
  methods: {
    submit(){
          const room = {
              id: this.room.id,
          }
      this.$store.dispatch('deleteRoom', room)
      this.loading = false;
      this.dialog = false;
      this.$emit('deleteRoom');
      
    },
    
  },

}
</script>

<style>

</style>