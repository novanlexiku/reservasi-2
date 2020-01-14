import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './assets/scss/app.scss'
import db from './fb'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false
Vue.use(VueLazyLoad)
Vue.filter('toCurrency', function (value) {
  if ((typeof value !== "number")&&(typeof value !== "string")) {
      return value;
  }
  
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
  });
  return formatter.format(value);
});


new Vue({
  router,
  store,
  vuetify,
  db,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  this.$store.dispatch('loadRooms'),
  this.$store.dispatch('loadBanks'),
  this.$store.dispatch('loadReservasi'),
  this.$store.dispatch('loadUsers'),
  this.$store.dispatch('loadKonfirmasi')

  }
}).$mount('#app')