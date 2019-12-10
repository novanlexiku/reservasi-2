import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './assets/scss/app.scss'
import * as firebase from 'firebase'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCtjxD5AY6XpsSywAAE3yJiVgy7e5ubFFc",
    authDomain: "reservasi-418c1.firebaseapp.com",
    databaseURL: "https://reservasi-418c1.firebaseio.com",
    projectId: "reservasi-418c1",
    storageBucket: "reservasi-418c1.appspot.com",
    messagingSenderId: "689967684897",
    appId: "1:689967684897:web:92a8765a35dcd076c6b260",
    measurementId: "G-QNMQS2DS4H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}).$mount('#app')
