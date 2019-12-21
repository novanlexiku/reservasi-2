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
import AlertCmp from './components/shared/Alert'

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)



let app;

firebase.auth().onAuthStateChanged(user => {
  console.log(user)
  if(!app){
    app = new Vue({
      router,
      store,
      vuetify,
      db,
      render: h => h(App),
      created () {
        
      this.$store.dispatch('loadRooms'),
      this.$store.dispatch('loadBanks'),
      this.$store.dispatch('loadReservasi')
      }
    }).$mount('#app')
  }
})