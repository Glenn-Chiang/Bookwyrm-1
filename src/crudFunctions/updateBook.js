import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase"

export default async function updateBook(user, bookId, updatedData) {
    try {        
        if (!user) {
            console.log('User not authenticated');
        }

        const bookDocRef = doc(db, 'users', user.uid, 'books', bookId);
        await updateDoc(bookDocRef, updatedData);

        console.log('Book updated');

    } catch (error) {
        console.log('Error updating book')
    }
    
  }
  