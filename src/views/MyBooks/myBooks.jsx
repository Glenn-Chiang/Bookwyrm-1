/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import styles from './myBooks.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookReader } from "@fortawesome/free-solid-svg-icons"
import Shelf from "./Shelf"
import getBooks from "../../crudFunctions/getBooks"
import ShelvesList from "../MyShelves/ShelvesList"
import { auth } from "../../firebase"

export default function MyBooks() {
  const [myBooks, setMyBooks] = useState([]);
  
  // Retrieve user's books when the component mounts
  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const userBooks = await getBooks();
        setMyBooks(userBooks);
      } catch (error) {
        console.log('Error retrieving books: ', error);
      }
    };
    fetchUserBooks();
  }, []);

  
  const [displayedShelf, setDisplayedShelf] = useState(null);
  
  // Not signed in 
  if (!auth.currentUser) {
    return (<p>Sign in to view your books</p>)
  }

  // Shelf displayed by clicking 'view shelf' button
  if (displayedShelf) {
    const shelfBooks = myBooks.filter(book => book.status === displayedShelf);
    return (
      <>
        <button className={styles.backBtn} onClick={() => setDisplayedShelf(null)}>
          Back to My Books
        </button>
        <Shelf shelfName={displayedShelf} shelfBooks={shelfBooks} setMyBooks={setMyBooks} />
        <button className={styles.backBtn} onClick={() => setDisplayedShelf(null)}>
          Back to My Books
        </button>
      </>
    )
  }

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>
        <FontAwesomeIcon icon={faBookReader}/>
        My Books
      </h2>
      
      <ShelvesList books={myBooks} shelfNames={['read', 'reading', 'to-read']} setDisplayedShelf={setDisplayedShelf}/>
    </div>
  )
}


