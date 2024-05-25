// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore,doc,getDoc,setDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA0bQffAN3JR478-12AJ47_WjfvD5drEgo",
  authDomain: "breastcancerdb-ccfa9.firebaseapp.com",
  databaseURL: "https://breastcancerdb-ccfa9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "breastcancerdb-ccfa9",
  storageBucket: "breastcancerdb-ccfa9.appspot.com",
  messagingSenderId: "783881195852",
  appId: "1:783881195852:web:bed08e65a4fca7ffe8ffe9",
  measurementId: "G-E0QP59VWSL"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const  googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt:"select_account"
});

export const auth= getAuth(firebaseApp)
export const signInWithGooglePopup=()=>signInWithPopup(auth,googleProvider)
export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,googleProvider)

export const db=getFirestore()

export const createUserDocumentFromAuth=async (userAuth,additionalInformation)=>{
  if(!userAuth){return}
  const userDocRef=doc(db,'users',userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)


if(!userSnapshot.exists()){
  const {displayName,email}=userAuth;
  const createAt= new Date();

  try {
    await setDoc(userDocRef,{
      displayName,email,createAt,...additionalInformation
    })
  } catch (error) {
    console.log('error creating the user',error);
  }
}
return userDocRef
}

export const createAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email||!password){return}
  return await createUserWithEmailAndPassword(auth,email,password)
}

export default firebaseApp