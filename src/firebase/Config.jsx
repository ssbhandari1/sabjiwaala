import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
export const firebaseConfig = {
  apiKey: "AIzaSyDrS2BLCf1FjpXG4sU9YBkvaD4uwpq2uDE",
  authDomain: "sabjiwaala-31c3f.firebaseapp.com",
  projectId: "sabjiwaala-31c3f",
  storageBucket: "sabjiwaala-31c3f.appspot.com",
  messagingSenderId: "247608938369",
  appId: "1:247608938369:web:e248c0d0ed60343e77a280"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
export const googleProvider=new GoogleAuthProvider()
export default app
