// Firebase Authentication (Kayıt Olma)
const auth = firebase.auth();

const signupForm = document.getElementById('signupForm');
const signupFirstName = document.getElementById('signupFirstName');
const signupLastName = document.getElementById('signupLastName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupPasswordConfirm = document.getElementById('signupPasswordConfirm');
const privacyPolicy = document.getElementById('privacyPolicy');
const newsletter = document.getElementById('newsletter');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Formdan verileri al
  const firstName = signupFirstName.value;
  const lastName = signupLastName.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  const passwordConfirm = signupPasswordConfirm.value;

  // Şifre doğrulama
  if (password !== passwordConfirm) {
    alert("Şifreler eşleşmiyor!");
    return;
  }

  // Gizlilik koşullarını kabul etme zorunluluğu
  if (!privacyPolicy.checked) {
    alert("Gizlilik koşullarını kabul etmeniz gerekmektedir.");
    return;
  }

  // Firebase'e kayıt işlemi
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Kayıt başarılı:', user);

      // Ekstra bilgileri Firebase'e kaydedebiliriz
      const db = firebase.firestore();
      db.collection('users').doc(user.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        newsletter: newsletter.checked,
      });

      window.location.href = 'index.html'; // Kayıttan sonra giriş ekranına yönlendirme
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Kayıt hatası: ${errorCode} - ${errorMessage}`);
    });
});
