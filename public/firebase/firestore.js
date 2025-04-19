import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firestore'u başlat
const db = getFirestore(app);

// Veritabanına veri ekleme örneği
const addUserData = async (name, email) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
