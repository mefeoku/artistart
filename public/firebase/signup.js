// Firebase ve Firestore bağlantılarını yapalım
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

// Firebase config dosyasını içeri al
import { firebaseConfig } from './firebase-Config';

// Firebase'i başlat
const auth = getAuth();
const db = getFirestore();

// Form elemanlarını seç
const signupForm = document.getElementById('signup-form');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nicknameInput = document.getElementById('nickname');
const dobInput = document.getElementById('dob');

// Form gönderildiğinde yapılacak işlemler
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // reCAPTCHA doğrulaması
  const recaptchaResponse = grecaptcha.getResponse();
  if (recaptchaResponse.length === 0) {
    toast.error("Lütfen reCAPTCHA doğrulamasını tamamlayın.", {
      position: "top-right",
      autoClose: 3000,
    });
    return; // Eğer reCAPTCHA geçerli değilse, işlem yapılmaz
  }

  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const nickname = nicknameInput.value;
  const dob = dobInput.value;

  try {
    // Kullanıcıyı Firebase'e kaydet
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Kullanıcıyı Firestore'a kaydet
    await setDoc(doc(db, 'users', user.uid), {
      fullName,
      email,
      nickname,
      dob,
      recaptchaToken: recaptchaResponse,
    });

    // Başarılı kayıt sonrası bildirim
    toast.success('Hesap başarıyla oluşturuldu!', {
      position: 'top-right',
      autoClose: 3000,
    });

    // Formu temizle
    signupForm.reset();

    // Giriş sayfasına yönlendirme veya başka bir işlem yapılabilir
    // window.location.href = '/login';  // Örneğin, login sayfasına yönlendirme
  } catch (error) {
    // Hata mesajını kullanıcıya göster
    toast.error(error.message, {
      position: 'top-right',
      autoClose: 3000,
    });
  }
});
