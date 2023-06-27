import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function getShelves(user) {
    try {
        if (!user) {
            console.log('User not authenticated')
            return [];
        } 

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userShelves = userDoc.data().shelves;
        return userShelves;    

    } catch (error) {
        console.log('Error getting shelves:', error);
        return [];
    }
}