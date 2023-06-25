import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase"

export default async function updateBook(bookId, updatedData) {
    try {
        const user = auth.currentUser;
        
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
  