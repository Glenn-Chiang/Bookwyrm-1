import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function getBooks(user) {
    try {
        if (!user) {
            console.log('User not authenticated');
            return [];
        }

        const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'books'));
        let userBooks = [];
        querySnapshot.forEach(bookDoc => userBooks.push(bookDoc.data()));
        console.log('Retrieved user books');
        return userBooks;        

    } catch (error) {
        console.log('Error getting books:', error);
        return [];
    }
}