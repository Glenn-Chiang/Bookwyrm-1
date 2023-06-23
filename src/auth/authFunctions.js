import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import createUserDoc from "../crudFunctions/createUserDoc";

async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        
        createUserDoc(userId);
        console.log('Signed up');
        
    } catch (error) {
        console.log('Error signing up: ', error);
    }
}


async function signIn(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Signed in');
    } catch (error) {
        console.log('Error signing in: ', error);
    }
}


async function signOutUser() {
    try {
        await signOut(auth);
        console.log('Signed out');
    } catch (error) {
        console.log('Error signing out: ', error);
    }
}

export { signUp, signIn, signOutUser };