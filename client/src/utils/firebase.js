
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interview-prep-8ce5c.firebaseapp.com",
  projectId: "interview-prep-8ce5c",
  storageBucket: "interview-prep-8ce5c.firebasestorage.app",
  messagingSenderId: "329151362246",
  appId: "1:329151362246:web:e9074d8c53dadd2c5f13c7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}