import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const fullName = document.getElementById('fullName').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log('Kullanıcı kaydedildi:', user);

      // Firestore'a ek bilgiler kaydet
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
      });

      // Başarılıysa yönlendirme
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Hata:", error.message);
      alert("Hata: " + error.message);
    });
});
