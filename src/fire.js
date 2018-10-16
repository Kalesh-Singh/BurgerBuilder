import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDF_4yy3_G7_2jaSce9Xgw_LSk0sTyMG3o",
    authDomain: "burgerbuilder-55e52.firebaseapp.com",
    databaseURL: "https://burgerbuilder-55e52.firebaseio.com",
    projectId: "burgerbuilder-55e52",
    storageBucket: "burgerbuilder-55e52.appspot.com",
    messagingSenderId: "1072260068405"
};

const fire = firebase.initializeApp(config);

export default fire;