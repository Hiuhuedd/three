import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyABDRRPeRUvBvm6NgfuK1ctmLTleDxdyWg",
    authDomain: "campus360-e88ab.firebaseapp.com",
    projectId: "campus360-e88ab",
    storageBucket: "campus360-e88ab.appspot.com",
    messagingSenderId: "868564611977",
    appId: "1:868564611977:web:b559bbe811cd2ca2972758",
    measurementId: "G-KJ91P1JX3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const AUTH = getAuth(app);
<<<<<<< HEAD
export const FIRESTORE = getFirestore(app);


          // "current_key": "AIzaSyB66XLCNEXipK4XLoj786iXNqfCIZm94UE"
        //   "current_key": "AIzaSyBURRB5X7MB1DLUp36w1NCoYdX0BKfyYB4"
=======
export const FIRESTORE = getFirestore(app);
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
