import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

// React Toastify kullanımı için global `toast` nesnesini erişiyoruz
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const fullName = document.getElementById('fullName').value;
  const nickname = document.getElementById('nickname').value;
  const dob = document.getElementById('dob').value;  // Doğum tarihi (gün, ay, yıl)

  // Firebase kullanıcı oluşturma işlemi
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log('Kullanıcı kaydedildi:', user);

      // Firestore'a ek bilgiler kaydet
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        nickname: nickname,  // Kullanıcı adı (nickname)
        dob: dob,  // Doğum tarihi
      });

      // Başarılı olduğunda toast mesajı göster
      toast.success('Hesabınız başarıyla açıldı!');
      window.location.href = "index.html"; // Yönlendirme
    })
    .catch((error) => {
      console.error("Hata:", error.message);
      // Hata durumunda toast mesajı göster
      toast.error('Kayıt işlemi başarısız! Hata: ' + error.message);
    });
});

// Şifreyi gösterme/gizleme işlevi
const togglePasswordButton = document.getElementById('togglePassword');
const passwordInput = document.getElementById('signupPassword');

togglePasswordButton.addEventListener('click', function() {
  // Şifre alanı gizli mi gösteriliyor mu kontrol et
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';  // Şifreyi metin olarak göster
    togglePasswordButton.textContent = 'Şifreyi Gizle';  // Buton yazısını değiştir
  } else {
    passwordInput.type = 'password';  // Şifreyi gizle
    togglePasswordButton.textContent = 'Şifreyi Göster';  // Buton yazısını değiştir
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('signupPassword');
  const toggleConfirm = document.getElementById('toggleConfirmPassword');
  const confirmInput = document.getElementById('confirmPassword');

  togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePassword.textContent = 'Şifreyi Gizle';
    } else {
      passwordInput.type = 'password';
      togglePassword.textContent = 'Şifreyi Göster';
    }
  });

  toggleConfirm.addEventListener('click', () => {
    if (confirmInput.type === 'password') {
      confirmInput.type = 'text';
      toggleConfirm.textContent = 'Şifreyi Gizle';
    } else {
      confirmInput.type = 'password';
      toggleConfirm.textContent = 'Şifreyi Göster';
    }
  });

  // Firebase signup
  document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const nickname = document.getElementById('nickname').value;
    const birthDate = document.getElementById('birthDate').value;

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
        fullName,
        email,
        nickname,
        birthDate
      });

      showToast('Kullanıcı başarıyla eklendi!', 'success');
    } catch (error) {
      showToast(`Kullanıcı eklenemedi: ${error.message}`, 'error');
    }
  });

  // Function to show toast
  function showToast(message, type) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.backgroundColor = type === 'success' ? 'green' : 'red';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.marginBottom = '10px';
    toast.style.borderRadius = '5px';
    toast.style.fontSize = '16px';

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 5000); // Remove toast after 5 seconds
  }
});

