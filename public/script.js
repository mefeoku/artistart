// Şifreyi Göster / Gizle işlevi - Login sayfası
const toggleLoginPasswordButton = document.getElementById('toggleLoginPassword');
const loginPasswordInput = document.getElementById('loginPassword');

toggleLoginPasswordButton.addEventListener('click', function() {
  // Şifre alanı gizli mi gösteriliyor mu kontrol et
  if (loginPasswordInput.type === 'password') {
    loginPasswordInput.type = 'text';  // Şifreyi metin olarak göster
    toggleLoginPasswordButton.textContent = 'Şifreyi Gizle';  // Buton yazısını değiştir
  } else {
    loginPasswordInput.type = 'password';  // Şifreyi gizle
    toggleLoginPasswordButton.textContent = 'Şifreyi Göster';  // Buton yazısını değiştir
  }
});

// Şifreyi Göster / Gizle işlevi - Signup sayfası
const toggleSignupPasswordButton = document.getElementById('toggleSignupPassword');
const signupPasswordInput = document.getElementById('signupPassword');

toggleSignupPasswordButton.addEventListener('click', function() {
  // Şifre alanı gizli mi gösteriliyor mu kontrol et
  if (signupPasswordInput.type === 'password') {
    signupPasswordInput.type = 'text';  // Şifreyi metin olarak göster
    toggleSignupPasswordButton.textContent = 'Şifreyi Gizle';  // Buton yazısını değiştir
  } else {
    signupPasswordInput.type = 'password';  // Şifreyi gizle
    toggleSignupPasswordButton.textContent = 'Şifreyi Göster';  // Buton yazısını değiştir
  }
});
