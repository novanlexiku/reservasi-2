<template>
  <v-app>
    <!-- Pemanggil navigasi bar -->
    <Navigation />
    <!-- Pemanggil Konten Utama -->
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from './components/nav/Navigation';

export default {
  name: 'App',

  components: {
    Navigation,
  },

  data: () => ({
    //
  }),
};
</script>
