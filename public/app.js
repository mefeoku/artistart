import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login işlemi
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!validateEmail(email)) {
    alert('Geçerli bir e-posta adresi girin');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Giriş başarılı:', user);
      // Kullanıcıyı ana sayfaya yönlendirebilirsiniz.
    })
    .catch((error) => {
      console.error('Giriş hatası:', error.message);
      alert('Giriş hatası: ' + error.message);
    });
});

// Sign up işlemi
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('sign-up-email').value;
  const password = document.getElementById('sign-up-password').value;

  if (!validateEmail(email)) {
    alert('Geçerli bir e-posta adresi girin');
    return;
  }

  if (!validatePassword(password)) {
    alert('Şifre 8 ile 16 karakter arasında olmalıdır');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Kayıt başarılı:', user);

      // E-posta doğrulaması gönderme
      sendEmailVerification(user)
        .then(() => {
          alert('E-posta adresinizi doğrulamak için bir bağlantı gönderildi!');
          // Kullanıcıyı ana sayfaya yönlendirebilirsiniz.
        })
        .catch((error) => {
          console.error('E-posta doğrulama hatası:', error.message);
        });
    })
    .catch((error) => {
      console.error('Kayıt hatası:', error.message);
      alert('Kayıt hatası: ' + error.message);
    });
});

// Şifre sıfırlama
document.getElementById('forgot-password').addEventListener('click', () => {
  const email = prompt('Şifrenizi sıfırlamak için e-posta adresinizi girin:');
  
  if (!validateEmail(email)) {
    alert('Geçerli bir e-posta adresi girin');
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Şifre sıfırlama bağlantısı gönderildi!');
    })
    .catch((error) => {
      console.error('Şifre sıfırlama hatası:', error.message);
      alert('Şifre sıfırlama hatası: ' + error.message);
    });
});

// E-posta doğrulama
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// Şifre doğrulama (8-16 karakter)
function validatePassword(password) {
  return password.length >= 8 && password.length <= 16;
}

// Ekranlar arasında geçiş
document.getElementById('sign-up-link').addEventListener('click', () => {
  document.querySelector('.form-container').style.display = 'none';
  document.querySelector('.sign-up-form').style.display = 'block';
});

document.getElementById('login-link').addEventListener('click', () => {
  document.querySelector('.form-container').style.display = 'block';
  document.querySelector('.sign-up-form').style.display = 'none';
});
// Şifreyi göster/gizle fonksiyonu
function togglePasswordVisibility(inputId, buttonId) {
    const passwordField = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    
    if (passwordField.type === 'password') {
      passwordField.type = 'text'; // Şifreyi göster
      button.textContent = 'Şifreyi Gizle'; // Buton metnini değiştir
    } else {
      passwordField.type = 'password'; // Şifreyi gizle
      button.textContent = 'Şifreyi Göster'; // Buton metnini değiştir
    }
  }
  
  // Login formu için şifreyi göster/gizle
  document.getElementById('show-password').addEventListener('click', () => {
    togglePasswordVisibility('password', 'show-password');
  });
  
  // Signup formu için şifreyi göster/gizle
  document.getElementById('show-signup-password').addEventListener('click', () => {
    togglePasswordVisibility('sign-up-password', 'show-signup-password');
  });
  