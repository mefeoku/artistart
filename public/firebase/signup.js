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
  // Doğum tarihi, Firebase'e gönderilmeyecek.
  // const birthDate = document.getElementById('birthDate').value; // Bu satırı kaldırdık

  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
      fullName,
      email,
      nickname
      // Doğum tarihi burada kaydedilmiyor
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
