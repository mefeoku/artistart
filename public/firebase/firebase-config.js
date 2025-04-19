// Firebase modüllerini doğru şekilde içe aktarın
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Firebase yapılandırma bilgilerini buraya ekleyin
const firebaseConfig = {
  apiKey: "API_KEY", // API anahtarınızı buraya ekleyin
  authDomain: "PROJECT_ID.firebaseapp.com", // Firebase projenizin auth domain'ini buraya girin
  projectId: "PROJECT_ID", // Proje ID'nizi buraya girin
  storageBucket: "PROJECT_ID.appspot.com", // Firebase Storage bucket bilgisi
  messagingSenderId: "SENDER_ID", // Firebase sender ID
  appId: "APP_ID", // Firebase uygulama ID'si
};

// Firebase uygulamasını başlatıyoruz
const app = initializeApp(firebaseConfig);

// Auth servisini alıyoruz
const auth = getAuth(app); 

// auth'u dışa aktarıyoruz
export { auth };
