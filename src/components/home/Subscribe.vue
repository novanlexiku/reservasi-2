<template>
  <v-container
    id="Berlangganan"
    
  >
    <v-card
      color="rgba(203, 170, 92, 0.51)"
      class="pa-3"
      tile
      flat
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-container
        grid-list-xl
        pa-0
      >
        <v-layout wrap>
          <v-flex
            xs12
            md5
          >
            <h2 class="subtitle-1 text-uppercase font-weight-bold mb-3">
              Berlangganan
            </h2>
            <p>
              Masukkan alamat emailmu untuk berlangganan
              dan dapatkan penawaran terbaru melalui email.
            </p>

            <v-layout
              wrap
              pa-2
            >
              <v-btn
                :block="$vuetify.breakpoint.xsOnly"
                class="ma-0"
                color="secondary"
                style="height: 48px"
                router to="/login"
              >
                Subscribe
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex
            xs12
            md6
            offset-md1
          >
            <h2 class="subtitle-1 text-uppercase font-weight-bold mb-3">Hubungi Kami</h2>
            <v-list class="transparent">
              <v-list-item>
                <v-list-item-avatar
                  color="primary"
                >
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-email-outline
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>EMAIL</v-list-item-title>
                <v-list-item-subtitle>
                  GRIYAPESONAINDAH@GMAIL.COM
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar
                  color="primary"
                >
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-map-marker
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>ALAMAT</v-list-item-title>
                <v-list-item-subtitle>
                  <p>Jl. Cendrawasih No.33, Panjer,</p>
                  <p>Kec. Kebumen, Kabupaten Kebumen,</p>
                  <p>Jawa Tengah Pos : 54313</p>                 
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar
                  color="primary"
                >
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-phone
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>TELP</v-list-item-title>
                <v-list-item-subtitle>
                  0858 2849 6464
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>

  export default {
    name: 'Subscribe',
    
    inheritAttrs: false
  }
</script>
