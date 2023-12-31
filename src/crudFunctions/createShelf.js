import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export default async function createShelf(user, shelfName) {
  try {
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, { shelves: arrayUnion(shelfName.toLowerCase()) });
    console.log('Shelf created');

  } catch (error) {
    console.log('Error creating shelf:', error)
  }
}