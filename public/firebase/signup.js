import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const fullName = document.getElementById('fullName').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      // Kullanıcı başarıyla kaydedildiğinde yapılacak işlemler
    })
    .catch((error) => {
      console.error(error.message);
      // Hata mesajları gösterilebilir
    });
});
