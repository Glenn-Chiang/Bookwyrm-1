import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default async function getShelves() {
    try {
        const user = auth.currentUser;

        if (!user) {
            console.log('User not authenticated')
            return [];
        } 

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        try {
            const userShelves = userDoc.data().shelves;
            return userShelves;
        } catch (error) {
            console.log('User has not created any shelves')
            return [];
        }

    } catch (error) {
        console.log('Error getting shelves:', error);
        return [];
    }
}