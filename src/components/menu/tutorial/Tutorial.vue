<template>
<v-container fluid>
    <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card
        :color="item.color"
        dark
      >
        <v-card-title class="title">{{item.title}}</v-card-title>
        <v-card-text class="white text--primary">
          <v-img
                    :src="item.image"
                    :lazy-src="item.image"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="300"
                    max-height="100"
                    ></v-img>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="white text--primary">
          {{item.konten}}
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</v-container>
  
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          title: 'Daftar / Login',
          konten: 'Untuk dapat mengakses reservasi pengguna di haruskan terlebih dahulu untuk Daftar/Login',
          color: 'red lighten-2',
          icon: 'mdi-star',
          image: 'https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_113.png?alt=media&token=bfa6a6d9-9fb5-46e8-a4b0-e4a8467ce75c'
        },
        {
          title: 'Pilih Ruangan',
          konten: 'Setelah login pengguna dapat memilih ruangan yang ingin di pesan',
          color: 'purple darken-1',
          icon: 'mdi-book-variant',
          image: 'https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_115.png?alt=media&token=6b86e074-b328-4e85-af60-793e5d075049'
        },
        {
          title: 'Masukkan Data Reservasi',
          konten: 'Selanjutnya pengguna diminta untuk mengisi data diri dan data reservasi',
          color: 'green lighten-1',
          icon: 'mdi-airballoon',
          image: 'https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_116.png?alt=media&token=6ee4459b-afd7-4070-83b1-fa03c3e4971d'
        },
        {
          title: 'Lakukan Pembayaran',
          konten: 'Setelah melakukan pemesanan, pengguna akan diberikan detail reservasi dan jumlah yang harus dibayarkan',
          color: 'indigo',
          icon: 'mdi-buffer',
          image: 'https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_117.png?alt=media&token=45d5a942-d059-4195-91a1-940a89195f40'
        },
        {
          title: 'Konfirmasi Pembayaran',
          konten: 'Jika sudah melakukan pembayaran, silahkan melakukan konfirmasi pada halaman konfirmasi',
          color: 'cyan',
          icon : 'mdi-scooter',
          image: 'https://firebasestorage.googleapis.com/v0/b/homestay-9f549.appspot.com/o/tutorial%2FScreenshot_118.png?alt=media&token=246ada1d-ca3b-40aa-accc-a1ffbf7f8570'
        }
      ],
    }),
  }
</script>