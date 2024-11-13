// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxK-Evb9qDFc4O33xIkZdlY9MKZUJsrGs",
  authDomain: "agrimartauth.firebaseapp.com",
  projectId: "agrimartauth",
  storageBucket: "agrimartauth.firebasestorage.app",
  messagingSenderId: "675307840228",
  appId: "1:675307840228:web:ce1c7ef0d9d65d02a702f1",
  measurementId: "G-5KMRDCFY9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the authentication module to use it in other parts of your app
export const auth = getAuth(app);
export default app;
