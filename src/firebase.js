// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUvNx5FuynSG1E6yR-Myedo_NkCenExTA",
  authDomain: "e-bazar-c4a58.firebaseapp.com",
  projectId: "e-bazar-c4a58",
  storageBucket: "e-bazar-c4a58.appspot.com",
  messagingSenderId: "672618867688",
  appId: "1:672618867688:web:0c53f20965e041f60a125d",
  measurementId: "G-SD074SNQM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);