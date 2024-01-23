import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
//import { getAnalytics } from "firebase/analytics";




const firebaseConfig = {
  apiKey: "AIzaSyB95nuoz6qNC-pgylqtfrCHusujynVODGk",
  authDomain: "task-942e3.firebaseapp.com",
  databaseURL: "https://task-942e3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "task-942e3",
  storageBucket: "task-942e3.appspot.com",
  messagingSenderId: "882591178423",
  appId: "1:882591178423:web:0ec770b8db848953d97732",
  measurementId: "G-WQR1RD9LD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app)
const database = getDatabase(app);

export {auth, database};

export default app;