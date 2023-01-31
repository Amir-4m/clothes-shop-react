import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()
        const updatedAt = new Date()


        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                updatedAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error in creating the user', error.message)

        }

    }

    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}
