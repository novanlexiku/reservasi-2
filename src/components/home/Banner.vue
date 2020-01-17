<template>
<v-card dark tile
    flat
    v-bind="$attrs"
    v-on="$listeners">
        <v-snackbar v-model="snackbar" top color="success">
          <span>Selamat! Anda telah terdaftar</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
  <!-- Parallax -->
    <v-parallax height="400" src="@/assets/homestay-banner.jpg">
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-right" cols="12">
        
                <h1 class="display-2 font-weight-thin">
                  GRIYA PESONA INDAH
                </h1>
                <div class="subtitle-1 text-uppercase pl-2 mb-4">
                  Comfortable and cozy place to stay
                </div>
              
      </v-col>
    </v-row></v-parallax>
</v-card>

  
</template>
<script>
  export default {
    name: 'Banner',
    inheritAttrs: false,
    data: () =>({
            snackbar: false,
    })
  }
</script>
