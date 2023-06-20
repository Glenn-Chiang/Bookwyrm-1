import { auth, db } from "../firebase";

export default async function getBooks() {
    try {
        const user = auth.currentUser;

        if (!user) {
            console.log('User not authenticated');
            return [];
        }

        const userBooksCollection = db.collection('userBooks');
        const userDocument = userBooksCollection.doc(user.uid);
        const booksQuerySnapshot = await userDocument.collection('myBooks').get();

        const myBooks = booksQuerySnapshot.map(bookDoc => bookDoc.data());
        return myBooks;

    } catch (error) {
        console.log('Error getting books: ' + error);
        return [];
    }
}