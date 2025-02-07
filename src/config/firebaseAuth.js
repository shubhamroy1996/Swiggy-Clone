
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzV3n5BKENjMNgoRqjI504dmaVlCn9X6M",
  authDomain: "swiggy-clone-d0aa6.firebaseapp.com",
  projectId: "swiggy-clone-d0aa6",
  storageBucket: "swiggy-clone-d0aa6.firebasestorage.app",
  messagingSenderId: "1039673730647",
  appId: "1:1039673730647:web:69273aae8973eacf442512"
};


//const app = initializeApp(firebaseConfig);

//const auth = getAuth(app)
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()

provider.setCustomParameters({   
    prompt : "select_account "
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
//export {auth, provider}