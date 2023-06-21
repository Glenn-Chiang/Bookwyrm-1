import { auth, db } from "../firebase";

async function signUp(email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const userId = userCredential.user.uid;
        
        try {
            createUserDocument(userId);
            console.log('Signed up');
        } catch (error) {
            console.log('Error creating user document: ', error);
        }

    } catch (error) {
        console.log('Error signing up: ', error);
    }
}

// When a user signs up, initialize an empty myBooks array mapped to that specific user
const createUserDocument = userId => {
    const userDocument = db.collection('userBooks').doc(userId);
    const myBooks = [];
    return userDocument.set({ myBooks });
}


async function signIn(email, password) {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        console.timeLog('Signed in');
    } catch (error) {
        console.log('Error signing in: ', error);
    }
}


async function signOut() {
    try {
        await auth.signOut();
        console.log('Signed out');
    } catch (error) {
        console.log('Error signing out: ', error);
    }
}

export { signUp, signIn, signOut };