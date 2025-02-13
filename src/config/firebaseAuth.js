
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID
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