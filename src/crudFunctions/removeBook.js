import { db } from "../firebase"
import { doc, deleteDoc } from "firebase/firestore";

export default async function removeBook(user, bookId) {
    try {
        if (!user) {
            console.log('User not authenticated');
        }

        const bookDocRef = doc(db, 'users', user.uid, 'books', bookId);
        await deleteDoc(bookDocRef);
        console.log('Book removed');

    } catch (error) {
        console.log('Error removing book: ' + error)
    }

}