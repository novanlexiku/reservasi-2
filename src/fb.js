import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firebase-analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAELl91CJrzUzI5Vr7cgB687v_htVeKiEc",
  authDomain: "homestay-9f549.firebaseapp.com",
  databaseURL: "https://homestay-9f549.firebaseio.com",
  projectId: "homestay-9f549",
  storageBucket: "gs://homestay-9f549.appspot.com/",
  messagingSenderId: "600613015666",
  appId: "1:600613015666:web:2c039deea214f787df32eb",
  measurementId: "G-YP00J8KH82"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

  // buat auth dan firestore
const db = firebase.firestore()

export default db;
