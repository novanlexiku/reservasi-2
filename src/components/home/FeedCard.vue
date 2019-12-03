<template>
  <v-flex
    xs12
    :class="classes"
  >
              <!-- Card Komponen -->
              <v-card 
              :height="value.prominent ? 450 : 350"
              color="grey lighten-1"
              dark
              router :to="`/res/${value.id}`"
              tile
              flat
              :id="`${value.id}`"
              v-bind="$attrs"
              v-on="$listeners">
                <v-img
                  :src="require(`@/assets/articles/${value.hero}`)"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="100%"
                >
                <v-row
                  v-if="!value.prominent"
                  fill-height
                  wrap
                  text-right
                  
                >
                  <v-flex xs12>
                    <v-chip
                      class="v-chip--active white--text caption my-2"
                      color="grey darken-3"
                      small
                      @click.stop=""
                    >
                    {{ value.category }}
                    </v-chip>
                    <v-chip small :color="`${value.status}`" :class="`v-chip--active white--text caption my-2`">{{value.status}}</v-chip>
                    <h3 class="title font-weight-bold ma-2">
                      {{ value.title }}
                    </h3>
                    <div class="caption ma-2">
                    {{ value.author }}<br>Date
                    </div>
                  </v-flex>
                  <v-flex align-self-end>
                    <v-chip
                      class="text-uppercase ma-2"
                      color="primary"
                      label
                      small
                      @click.stop=""
                    >
                      Pesan Sekarang
                    </v-chip>
                  </v-flex>
                </v-row>
                </v-img>
              </v-card>
              
            
   
  </v-flex>
</template>

<script>
  export default {
        inheritAttrs: false,
    props: {
      size: {
        type: Number,
        required: true
      },
      value: {
        type: Object,
        default: () => ({})
      }
    },

    computed: {
      classes () {
        return {
          'md6': this.size === 2,
          'md4': this.size === 3
        }
      }
    }
  }
</script>

<style>
.v-image__image {
  transition: .3s linear;
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
