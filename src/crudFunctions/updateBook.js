import { auth, db } from "../firebase"


export default async function updateBook(bookId, updatedData) {
    try {
        const user = auth.currentUser;
        
        if (!user) {
            console.log('User not authenticated');
            return;
        }

        const userBooksCollection = db.collection('userBooks'); // Books for all users
        const userDocument = userBooksCollection.doc(user.uid);
        const myBooks = userDocument.collection('myBooks'); // Books for this user
        const myBook = myBooks.doc(bookId); // Get the book that we want to update
        await myBook.update(updatedData); // Update specified properties
        console.log('Book updated');

    } catch (error) {
        console.log('Error updating book')
    }
    
  }
  