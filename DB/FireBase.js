import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { firebaseKey } from '../keys/Key'

const firebaseConfig = firebaseKey;

// Firebase 초기화
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db