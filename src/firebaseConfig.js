import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9X0B_2re6myd0ahGtyJLD2uIg_bEhpoU",
  authDomain: "connect4-9afaa.firebaseapp.com",
  projectId: "connect4-9afaa",
  storageBucket: "connect4-9afaa.appspot.com",
  messagingSenderId: "557119698890",
  appId: "1:557119698890:web:43e4e1b6d0868716434133",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
