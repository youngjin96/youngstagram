import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5EMZ6QgGBDDD2nyoJRErqdy2IV_eP9ko",
  authDomain: "youngstagram-e6806.firebaseapp.com",
  projectId: "youngstagram-e6806",
  storageBucket: "youngstagram-e6806.appspot.com",
  messagingSenderId: "72953816598",
  appId: "1:72953816598:web:4fc6d7f33eacd6fe11f737",
  measurementId: "G-J2YNTMENVF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);