import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHNhYJJZuy1_1kPhh2dGQSC46gIrINYlk",
  authDomain: "bahagiadamas.firebaseapp.com",
  projectId: "bahagiadamas",
  storageBucket: "bahagiadamas.firebasestorage.app",
  messagingSenderId: "22737524500",
  appId: "1:22737524500:web:e9ab011c0790db4df4d401",
  measurementId: "G-D71F2HWTQ7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

async function getData(collectionName, orderByField = null) {
  try {
    let q;
    if (orderByField) {
      q = query(collection(db, collectionName), orderBy(orderByField, "asc"));
    } else {
      q = query(collection(db, collectionName));
    }
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${collectionName}:`, error);
    return [];
  }
}

export { db, auth, googleProvider, getData };
