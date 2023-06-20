import titlecase from "../utility/titlecase";
import auth from '../auth/authFunctions'
import { db } from '../firebase'

export default async function addBook(book) {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.log('User not authenticated');
        }

        const userBooksCollection = db.collection('userBooks'); // All books for all users
        const userDocument = userBooksCollection.doc(user.uid);
        const myBooks = userDocument.collection('myBooks'); // All books for this user
        const querySnapshot = await myBooks.where('id', '===', book.id).get(); // Check if user already owns book

        if (querySnapshot.empty) { // Add book if user does not already own it
            await myBooks.add(book);
            console.log('Book added')
        }
        else { // Don't add book if user already owns it
            const shelvedBook = await querySnapshot.docs[0].data(); // Get the book that the user already owns
            throw new Error(`This book is already in your '${titlecase(shelvedBook.status)}' shelf!`)
        }

    } catch (error) {
        console.log('Error adding book');
    }
}
