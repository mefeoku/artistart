/* KARANLIK TEMA - SIGNUP SAYFASI */
:root {
  --bg-dark: #0D0D0D; /* Daha koyu arkaplan */
  --card-dark: #1A1A1A; /* Kart rengi */
  --input-dark: #262626; /* Input arkaplan */
  --yellow-primary: #FFEE93; /* Pastel sarı */
  --yellow-hover: #F9DC5C; /* Hover efekti */
  --text-light: #F0F0F0; /* Ana yazı rengi */
  --text-gray: #AAAAAA; /* İkincil yazı */
  --text-dark: #333333; /* Koyu yazı */
  --border-color: rgba(255, 238, 147, 0.15); /* Sarı border */
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', system-ui, sans-serif;
  background-color: var(--bg-dark);
  color: var(--text-light);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255,238,147,0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255,238,147,0.05) 0%, transparent 50%);
}

/* AUTH CONTAINER */
.auth-container {
  background-color: var(--card-dark);
  padding: 2.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(8px);
}

.auth-container h2 {
  text-align: center;
  margin-bottom: 1.8rem;
  color: var(--yellow-primary);
  font-size: 1.8rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* INPUT ALANLARI */
.input-container {
  position: relative;
  margin-bottom: 1.3rem;
}

.input-container input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  background-color: var(--input-dark);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.input-container input:focus {
  outline: none;
  border-color: var(--yellow-primary);
  box-shadow: 0 0 0 3px rgba(255, 238, 147, 0.2);
}

.input-container input::placeholder {
  color: var(--text-gray);
  opacity: 0.7;
}

/* ŞİFRE TOGGLE */
.toggle-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--yellow-primary);
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.toggle-icon:hover {
  color: var(--yellow-hover);
  transform: translateY(-50%) scale(1.1);
}

.password-requirements {
  font-size: 0.75rem;
  color: var(--text-gray);
  margin-top: 0.5rem;
  display: block;
}

/* CHECKBOX */
.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.8rem;
}

.checkbox-container input[type="checkbox"] {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid var(--yellow-primary);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox-container input[type="checkbox"]:checked {
  background-color: var(--yellow-primary);
}

.checkbox-container input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  color: var(--text-dark);
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}

.checkbox-container label {
  color: var(--text-gray);
  font-size: 0.85rem;
}

.checkbox-container a {
  color: var(--yellow-primary);
  text-decoration: none;
}

.checkbox-container a:hover {
  text-decoration: underline;
}

/* BUTON */
button[type="submit"] {
  width: 100%;
  padding: 0.9rem;
  background-color: var(--yellow-primary);
  color: var(--text-dark);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

button[type="submit"]:hover {
  background-color: var(--yellow-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 238, 147, 0.3);
}

button[type="submit"]:active {
  transform: translateY(0);
}

/* FOOTER LINK */
.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-gray);
  font-size: 0.9rem;
}

.auth-footer a {
  color: var(--yellow-primary);
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}

/* TOAST BİLDİRİMLERİ */
#toast-container {
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out forwards;
}

.toast.success {
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
}

.toast.error {
  background: linear-gradient(135deg, #F44336, #C62828);
}

.toast i {
  font-size: 1.2rem;
}

/* ANİMASYONLAR */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* RESPONSIVE */
@media (max-width: 480px) {
  .auth-container {
    padding: 1.8rem;
    width: 85%;
  }
  
  .auth-container h2 {
    font-size: 1.5rem;
  }
  
  button[type="submit"] {
    padding: 0.8rem;
  }
}
