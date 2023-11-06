import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBs_FiwcVMktFOHrGcHlnqOy0uS_MddL24",
    authDomain: "mbpj-14a45.firebaseapp.com",
    projectId: "mbpj-14a45",
    storageBucket: "mbpj-14a45.appspot.com",
    messagingSenderId: "880617056156",
    appId: "1:880617056156:web:0f2a51e87498d881b18a59",
    measurementId: "G-QT076Q1SWX"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db