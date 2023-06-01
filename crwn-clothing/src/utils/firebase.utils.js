
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, signInWithRedirect,signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwe0vrTQj1nvSfI1f2j3jZTnhiQqmz8GQ",
  authDomain: "crwn-clothing-bb784.firebaseapp.com",
  projectId: "crwn-clothing-bb784",
  storageBucket: "crwn-clothing-bb784.appspot.com",
  messagingSenderId: "932884419832",
  appId: "1:932884419832:web:57c2be8a1f4f682a8ad70d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, aditionalInformation={}) => {
    const userDocRef = doc(db, 'users',userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...aditionalInformation,
            })
        }catch(error){
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email|| !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}



export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email|| !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}