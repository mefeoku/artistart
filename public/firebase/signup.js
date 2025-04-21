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
