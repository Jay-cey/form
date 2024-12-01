import './styles/globals.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwHkY0sxJAIgFWwqgxvvh8GJtE5fYlXxU",
  authDomain: "form-material-f7067.firebaseapp.com",
  projectId: "form-material-f7067",
  storageBucket: "form-material-f7067.firebasestorage.app",
  messagingSenderId: "862494351598",
  appId: "1:862494351598:web:83df13966d475f6ef9d3ff",
  measurementId: "G-1YQGKWSKDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const config = {
  matcher: ['/', '/products/:path*'],
};