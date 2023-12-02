import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNNCBaxWnFulcMKZ7joeTddEMzf6nDjm8",
  authDomain: "photofolio-dce8b.firebaseapp.com",
  projectId: "photofolio-dce8b",
  storageBucket: "photofolio-dce8b.appspot.com",
  messagingSenderId: "275043433167",
  appId: "1:275043433167:web:c4b44b79d1d75143c715ba",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
