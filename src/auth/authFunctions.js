import { auth } from "../firebase";

async function signUp(email, password) {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        console.log('Signed up');
    } catch (error) {
        console.log('Error signing up: ' + error);
    }
}


async function signIn(email, password) {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        console.timeLog('Signed in');
    } catch (error) {
        console.log('Error signing in: ' + error);
    }
}


async function signOut() {
    try {
        await auth.signOut();
        console.log('Signed out');
    } catch (error) {
        console.log('Error signing out');
    }
}

export { signUp, signIn, signOut };