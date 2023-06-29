import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function getShelves(userId) {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        const userShelves = userDoc.data().shelves;
        return userShelves;    

    } catch (error) {
        console.log('Error getting shelves:', error);
        return [];
    }
}