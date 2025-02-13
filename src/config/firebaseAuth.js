
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = JSON.parse(import.meta.env.VITE_KEY)

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