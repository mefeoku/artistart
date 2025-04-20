// Firebase SDK modüllerini içe aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase ayarların
const firebaseConfig = {
  apiKey: "AIzaSyBEp6dsV_L5OpuJIXifBTEJ9moiRqGPfEU",
  authDomain: "artist-chat-2652b.firebaseapp.com",
  projectId: "artist-chat-2652b",
  storageBucket: "artist-chat-2652b.appspot.app", 
  messagingSenderId: "773771165376",
  appId: "1:773771165376:web:d6c02ca28af6f5746b7725",
  measurementId: "G-96T97M1H40"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore servislerini dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);
