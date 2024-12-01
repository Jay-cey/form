// Import the modular SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwHkY0sxJAIgFWwqgxvvh8GJtE5fYlXxU",
  authDomain: "form-material-f7067.firebaseapp.com",
  projectId: "form-material-f7067",
  storageBucket: "form-material-f7067.appspot.com",
  messagingSenderId: "862494351598",
  appId: "1:862494351598:web:83df13966d475f6ef9d3ff",
  measurementId: "G-1YQGKWSKDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
