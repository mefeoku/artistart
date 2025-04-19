// Şifreyi Göster / Gizle işlevi
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
