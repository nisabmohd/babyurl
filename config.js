const firebase = require("firebase")
const firebaseConfig = {
    apiKey: "AIzaSyB5Hdxt0VqHldH_pz-9p_Ita3TKfV5uo8g",
    authDomain: "urlbaby.firebaseapp.com",
    projectId: "urlbaby",
    storageBucket: "urlbaby.appspot.com",
    messagingSenderId: "242940617418",
    appId: "1:242940617418:web:4f9c6d551ef4bf30ef4a33"
};
firebase.initializeApp(firebaseConfig)
let db = firebase.firestore();
module.exports = db;