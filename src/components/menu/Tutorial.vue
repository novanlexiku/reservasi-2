<template>
  <div class="tutorial">
      <v-container>
          <v-timeline :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item
            color="purple lighten-2"
            fill-dot
            right
            >
            <v-card>
                <v-card-title class="purple lighten-2">
                <v-icon
                    dark
                    size="42"
                    class="mr-4"
                >
                    mdi-magnify
                </v-icon>
                <h2 class="display-1 white--text font-weight-light">Daftar/Login</h2>
                </v-card-title>
                <v-container>
                <v-row>
                    <v-col cols="12" md="10">
                    <v-card
                                color="#385F73"
                                dark
                            >
                                <v-card-subtitle>Untuk dapat mengakses reservasi pengguna di haruskan terlebih dahulu untuk Daftar/Login</v-card-subtitle>
                            </v-card>
                            </v-col>
                            
                    <v-col
                    class="hidden-sm-and-down text-right"
                    md="2"
                    >
                    <v-icon size="64">mdi-calendar-text</v-icon>
                    </v-col>
                    <v-img
                    src="https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_113.png?alt=media&token=bfa6a6d9-9fb5-46e8-a4b0-e4a8467ce75c"
                    lazy-src="https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_113.png?alt=media&token=bfa6a6d9-9fb5-46e8-a4b0-e4a8467ce75c"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="300"
                    max-height="100"
                    ></v-img>
                    
                </v-row>
                </v-container>
            </v-card>
            </v-timeline-item>

            <v-timeline-item
            color="amber lighten-1"
            fill-dot
            left
            small
            >
            <v-card>
                <v-card-title class="amber lighten-1 justify-end">
                <h2 class="display-1 mr-4 white--text font-weight-light">Pilih Ruangan</h2>
                <v-icon
                    dark
                    size="42"
                >mdi-home-outline</v-icon>
                </v-card-title>
                <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                    <v-card
                                color="#1F7087"
                                dark
                            >
                                <v-card-subtitle>Setelah login pengguna dapat memilih ruangan yang ingin di pesan</v-card-subtitle>
                            </v-card>
                            </v-col>
                    <v-img
                    src="https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_115.png?alt=media&token=6b86e074-b328-4e85-af60-793e5d075049"
                    lazy-src="https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_115.png?alt=media&token=6b86e074-b328-4e85-af60-793e5d075049"
                    aspect-ratio="1"
                    class="grey lighten-2 ml-5"
                    max-width="400"
                    max-height="200"
                    ></v-img>
                </v-row>
                </v-container>
            </v-card>
            </v-timeline-item>

            <v-timeline-item
            color="cyan lighten-1"
            fill-dot
            right
            >
            <v-card>
                <v-card-title class="cyan lighten-1">
                <v-icon
                    class="mr-4"
                    dark
                    size="42"
                >
                    mdi-email-outline
                </v-icon>
                <h2 class="display-1 white--text font-weight-light">Masukkan Data Reservasi</h2>
                </v-card-title>
                <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                    <v-card
                                color="#952175"
                                dark
                            >
                                <v-card-subtitle>Selanjutnya pengguna diminta untuk mengisi data diri dan data reservasi</v-card-subtitle>
                            </v-card>
                            </v-col>
                    <v-img
                    src="https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_116.png?alt=media&token=6ee4459b-afd7-4070-83b1-fa03c3e4971d"
                    lazy-src="https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_116.png?alt=media&token=6ee4459b-afd7-4070-83b1-fa03c3e4971d"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="200"
                    max-height="400"
                    ></v-img>
                </v-row>
                </v-container>
            </v-card>
            </v-timeline-item>

            <v-timeline-item
            color="red lighten-1"
            fill-dot
            left
            small
            >
            <v-card>
                <v-card-title class="red lighten-1 justify-end">
                <h2 class="display-1 mr-4 white--text font-weight-light">Lakukan Pembayaran</h2>
                <v-icon
                    dark
                    size="42"
                >
                    mdi-account-multiple-outline
                </v-icon>
                </v-card-title>
                <v-container>
                <v-row>
                    <v-col class="hidden-sm-and-down" md="2">
                    <v-icon size="64">mdi-server-network</v-icon>
                    </v-col>
                    <v-col cols="12" md="10">
                    <v-card
                                color="#1F7047"
                                dark
                            >
                                <v-card-subtitle>Setelah melakukan pemesanan, pengguna akan diberikan detail reservasi dan jumlah yang harus dibayarkan</v-card-subtitle>
                            </v-card>
                            </v-col>
                    <v-img
                    src="https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_117.png?alt=media&token=45d5a942-d059-4195-91a1-940a89195f40"
                    lazy-src="https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_117.png?alt=media&token=45d5a942-d059-4195-91a1-940a89195f40"
                    aspect-ratio="1"
                    class="grey lighten-2 ml-4"
                    max-width="200"
                    max-height="200"
                    ></v-img>
                </v-row>
                </v-container>
            </v-card>
            </v-timeline-item>

            <v-timeline-item
            color="green lighten-1"
            fill-dot
            right
            >
            <v-card>
                <v-card-title class="green lighten-1">
                <v-icon
                    class="mr-4"
                    dark
                    size="42"
                >
                    mdi-phone-in-talk
                </v-icon>
                <h2 class="display-1 white--text font-weight-light">Konfirmasi Pembayaran</h2>
                </v-card-title>
                <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                    <v-card
                                color="#1F4047"
                                dark
                            >
                                <v-card-subtitle>Jika sudah melakukan pembayaran, silahkan melakukan konfirmasi pada halaman konfirmasi</v-card-subtitle>
                            </v-card>
                            </v-col>
                    <v-img
                    src="https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_118.png?alt=media&token=246ada1d-ca3b-40aa-accc-a1ffbf7f8570"
                    lazy-src="https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_118.png?alt=media&token=246ada1d-ca3b-40aa-accc-a1ffbf7f8570"
                    aspect-ratio="1"
                    class="grey lighten-2 ml-4"
                    max-width="300"
                    max-height="200"
                    ></v-img>
                </v-row>
                </v-container>
            </v-card>
            </v-timeline-item>
        </v-timeline>
      </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>