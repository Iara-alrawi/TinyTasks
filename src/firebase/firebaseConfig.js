// Importera Firebase funktioner
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Din Firebase konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyD6rzsZeES20BlzHH_q4FAlCQWX1ZHa5bk",
  authDomain: "tinytasks-b929d.firebaseapp.com",
  databaseURL: "https://tinytasks-b929d-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "tinytasks-b929d",
  storageBucket: "tinytasks-b929d.appspot.com",
  messagingSenderId: "630763423261",
  appId: "1:630763423261:web:3a2e6936fcb8f5afa6e8f4",
  measurementId: "G-LDFDMHWSV4"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Exportera Auth och Database
export const auth = getAuth(app);
export const database = getDatabase(app);