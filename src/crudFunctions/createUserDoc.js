import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

// When a user signs up, initialize an empty myBooks array mapped to that specific user
export default async function createUserDoc(userId) {
    const shelves = [];
    try {
        await setDoc(doc(db, 'users', userId), { userId, shelves }); // remember to add at least 1 field or else the document won't exist
        console.log('Created user document');
    } catch (error) {
        console.log('Error creating user document:', error);
    }
}