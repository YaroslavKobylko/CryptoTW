import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyBM0fFHDxxWXBPMfMN32ZgB82mrCSkilcs',
  authDomain: "myprojectauth-b5844.firebaseapp.com",
  databaseURL:"https://myprojectauth-b5844-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "myprojectauth-b5844",
  storageBucket: "myprojectauth-b5844.appspot.com",
  messagingSenderId: "462776841154",
  appId: "1:462776841154:web:e607a6dc5a3b960e265c5b"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

export default db;