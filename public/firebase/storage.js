import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';

// Firebase Storage'i başlat
const storage = getStorage(app);

// Dosya yükleme örneği
const uploadFile = async (file) => {
  const storageRef = ref(storage, 'images/' + file.name);
  try {
    await uploadBytes(storageRef, file);
    console.log('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file: ', error);
  }
};
