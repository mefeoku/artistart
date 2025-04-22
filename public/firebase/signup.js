import { 
  auth, 
  db, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  doc, 
  setDoc, 
  serverTimestamp 
} from './firebase-config.js';

// Şifre Toggle Fonksiyonu
const setupPasswordToggle = () => {
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('signupPassword');
  const toggleConfirm = document.getElementById('toggleConfirmPassword');
  const confirmInput = document.getElementById('confirmPassword');

  [togglePassword, toggleConfirm].forEach((toggle, i) => {
    toggle.addEventListener('click', () => {
      const input = i === 0 ? passwordInput : confirmInput;
      const icon = toggle.querySelector('i');
      input.type = input.type === 'password' ? 'text' : 'password';
      icon.className = input.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
  });
};

// Kayıt Formu İşlemi
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const fullName = document.getElementById('fullName').value;
  const nickname = document.getElementById('nickname').value;

  try {
    // 1. Kullanıcı Oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // 2. E-posta Doğrulama Gönder
    await sendEmailVerification(userCredential.user);
    
    // 3. Firestore'a Kaydet
    await setDoc(doc(db, "users", userCredential.user.uid), {
      fullName,
      email,
      nickname,
      createdAt: serverTimestamp()
    });

    showToast('✅ Kayıt başarılı! Doğrulama e-postanız gönderildi.', 'success');
    setTimeout(() => window.location.href = "index.html", 3000);

  } catch (error) {
    handleFirebaseError(error);
  }
});

// Hata Yönetimi
const handleFirebaseError = (error) => {
  console.error("Firebase Hatası:", error);
  const errorMap = {
    'auth/email-already-in-use': 'Bu e-posta zaten kullanımda',
    'auth/weak-password': 'Şifre en az 6 karakter olmalı',
    'auth/invalid-email': 'Geçersiz e-posta formatı'
  };
  showToast(`❌ ${errorMap[error.code] || error.message}`, 'error');
};

// Toast Bildirimi
const showToast = (message, type) => {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
};

// Sayfa Yüklenince Çalışacaklar
document.addEventListener('DOMContentLoaded', () => {
  setupPasswordToggle();
});
