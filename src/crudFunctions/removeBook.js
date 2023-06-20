import { auth, db } from "../firebase"

export default async function removeBook(bookId) {
    try {
        const user = auth.currentUser;

        if (!user) {
            console.log('User not authenticated');
        }

        const userBooksCollection = db.collection('userBooks');
        const userDocument = userBooksCollection.doc(user.uid);
        const myBooks = userDocument.collection('myBooks');
        const myBook = myBooks.doc(bookId);
        await myBook.delete();
        console.log('Book removed');

    } catch (error) {
        console.log('Error removing book: ' + error)
    }

}