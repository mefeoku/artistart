// Firebase modüllerini import edin (firebase-config.js'den export edilenler)
import { 
  auth,
  db,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from './firebase-config.js';
import { 
  doc, 
  setDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Şifre göster/gizle fonksiyonları
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('signupPassword');
const toggleConfirm = document.getElementById('toggleConfirmPassword');
const confirmInput = document.getElementById('confirmPassword');

togglePassword.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    passwordInput.type = 'password';
    togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
  }
});

toggleConfirm.addEventListener('click', () => {
  if (confirmInput.type === 'password') {
    confirmInput.type = 'text';
    toggleConfirm.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    confirmInput.type = 'password';
    toggleConfirm.innerHTML = '<i class="fas fa-eye"></i>';
  }
});

// Firebase kayıt işlemi
document.getElementById('signupForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const nickname = document.getElementById('nickname').value;

  // Şifre doğrulama
  if (password !== confirmPassword) {
    showToast('Şifreler eşleşmiyor!', 'error');
    return;
  }

  try {
    // 1. Kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // 2. E-posta doğrulama gönder
    await sendEmailVerification(userCredential.user);
    
    // 3. Firestore'a kullanıcı bilgilerini kaydet
    await setDoc(doc(db, "users", userCredential.user.uid), {
      fullName,
      email,
      nickname,
      createdAt: serverTimestamp()
    });

    showToast('✅ Kayıt başarılı! Doğrulama e-postanı kontrol et.', 'success');
    
    // 3 saniye sonra yönlendir
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);

  } catch (error) {
    console.error("Kayıt hatası:", error);
    
    let errorMessage = "Kayıt sırasında hata oluştu";
    switch(error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "Bu e-posta zaten kullanımda";
        break;
      case 'auth/weak-password':
        errorMessage = "Şifre en az 6 karakter olmalı";
        break;
      case 'auth/invalid-email':
        errorMessage = "Geçersiz e-posta formatı";
        break;
      default:
        errorMessage = error.message;
    }
    
    showToast(`❌ ${errorMessage}`, 'error');
  }
});

// Toast bildirim fonksiyonu
function showToast(message, type) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}
