import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { 
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBEp6dsV_L5OpuJIXifBTEJ9moiRqGPfEU",
  authDomain: "artist-chat-2652b.firebaseapp.com",
  projectId: "artist-chat-2652b",
  storageBucket: "artist-chat-2652b.appspot.com",
  messagingSenderId: "773771165376",
  appId: "1:773771165376:web:d6c02ca28af6f5746b7725"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, sendEmailVerification, doc, setDoc, serverTimestamp };
