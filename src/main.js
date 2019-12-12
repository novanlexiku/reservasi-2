import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './assets/scss/app.scss'
import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import AlertCmp from './components/shared/Alert'

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAELl91CJrzUzI5Vr7cgB687v_htVeKiEc",
    authDomain: "homestay-9f549.firebaseapp.com",
    databaseURL: "https://homestay-9f549.firebaseio.com",
    projectId: "homestay-9f549",
    storageBucket: "homestay-9f549.appspot.com",
    messagingSenderId: "600613015666",
    appId: "1:600613015666:web:2c039deea214f787df32eb",
    measurementId: "G-YP00J8KH82"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  this.$store.dispatch('loadRooms')
  }
}).$mount('#app')
