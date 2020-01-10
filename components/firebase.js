import firebase from 'firebase';
import '@firebase/firestore';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBOWWqrBdO66OyKuxFgutQOTLKAWMRMQ1Y",
    authDomain: "pizzafollia-1542801138314.firebaseapp.com",
    databaseURL: "https://pizzafollia-1542801138314.firebaseio.com",
    projectId: "pizzafollia-1542801138314",
    storageBucket: "pizzafollia-1542801138314.appspot.com",
    messagingSenderId: "243517309572",
    appId: "1:243517309572:web:468985ecdb1f6582"
  }; 
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.firestore();
  
  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();