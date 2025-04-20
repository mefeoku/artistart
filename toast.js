// toast.js
import { toast } from 'react-toastify';

export const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};
import Toast from './toast.js';  // Toast.js dosyasını import edin

function App() {
  return (
    <div>
      {/* Diğer bileşenler */}
      <Toast /> {/* ToastContainer'ı burada kullanıyoruz */}
    </div>
  );
}
