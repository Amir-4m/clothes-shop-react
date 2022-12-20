import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBklymcP7qNanysoqUWsf7L2NJBaZ8H2y0",
    authDomain: "crwn-clothing-db-a5f59.firebaseapp.com",
    projectId: "crwn-clothing-db-a5f59",
    storageBucket: "crwn-clothing-db-a5f59.appspot.com",
    messagingSenderId: "410480909179",
    appId: "1:410480909179:web:e7ce2bc3fa55243c1ffbde"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)