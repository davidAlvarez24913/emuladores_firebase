import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const  db = getFirestore();
// export const Firebase = initializeApp(firebaseConfig);
export const Firebase = initializeApp({
    apiKey: 'test',
    projectId: 'demo-test'
});

export const auth = getAuth();
export const Providers = { google: new GoogleAuthProvider() };
