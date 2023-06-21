import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

export default async function getBooks() {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.log('User not authenticated');
            return [];
        }

        const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'books'));
        if (!querySnapshot.empty) {
            let userBooks = [];
            querySnapshot.forEach(bookDoc => userBooks.push(bookDoc.data()));
            console.log('Retrieved user books');
            return userBooks;
            
        } else {
            console.log('User does not have any books')
            return [];
        }

    } catch (error) {
        console.log('Error getting books:', error);
        return [];
    }
}