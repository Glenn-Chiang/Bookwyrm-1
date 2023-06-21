import titlecase from "../utility/titlecase";
import { auth } from '../firebase'
import { db } from '../firebase'
import { doc, setDoc, getDoc } from "firebase/firestore";

export default async function addBook(book) {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.log('User not authenticated');
        }

        const bookDocRef = doc(db, 'users', user.uid, 'books', book.id);
        const bookDoc = await getDoc(bookDocRef);
        if (bookDoc.exists()) { // User already owns book -> don't add
            const bookObject = bookDoc.data();
            throw new Error(`This book is already in your '${titlecase(bookObject.status)}' shelf!`);
        }
        else { 
            await setDoc(bookDocRef, book);
            console.log('Book added');
        }

    } catch (error) {
        console.log('Error adding book', error);
    }
}
