import { auth } from './firebase-config.js'; // Firebase Auth'u içe aktar
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(); // Firestore örneği

const signupForm = document.getElementById('signupForm');
const signupFirstName = document.getElementById('signupFirstName');
const signupLastName = document.getElementById('signupLastName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupPasswordConfirm = document.getElementById('signupPasswordConfirm');
const privacyPolicy = document.getElementById('privacyPolicy');
const newsletter = document.getElementById('newsletter');

import { createUserWithEmailAndPassword } from "firebase/auth";

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = signupFirstName.value;
  const lastName = signupLastName.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  const passwordConfirm = signupPasswordConfirm.value;

  if (password !== passwordConfirm) {
    alert("Şifreler eşleşmiyor!");
    return;
  }

  if (!privacyPolicy.checked) {
    alert("Gizlilik koşullarını kabul etmeniz gerekmektedir.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      newsletter: newsletter.checked,
    });

    console.log('Kayıt başarılı:', user);
    window.location.href = 'index.html';
  } catch (error) {
    console.error(`Kayıt hatası: ${error.code} - ${error.message}`);
    alert(`Hata: ${error.message}`);
  }
});
