// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsKTSb7JkxjfVFIjeyclwBsqCfkZn6TMA",
  authDomain: "servify1.firebaseapp.com",
  projectId: "servify1",
  storageBucket: "servify1.appspot.com",
  messagingSenderId: "280895755699",
  appId: "1:280895755699:web:061f8ba9c2f0c8d34c67c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
