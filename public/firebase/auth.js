import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Auth servisini başlat
const auth = getAuth(app);

// Kullanıcı kaydı oluşturma örneği
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};
