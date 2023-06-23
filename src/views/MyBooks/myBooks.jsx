/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import styles from './myBooks.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookReader } from "@fortawesome/free-solid-svg-icons"
import Shelf from "./Shelf"
import getBooks from "../../crudFunctions/getBooks"
import ShelvesList from "../MyShelves/ShelvesList"

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
  
  const booksRead = myBooks.filter(book => book.status === 'read');
  const booksReading = myBooks.filter(book => book.status === 'reading');
  const booksToRead = myBooks.filter(book => book.status === 'to-read');


  return (
    <div className={styles.main}>
      <h2 className={styles.header}>
        <FontAwesomeIcon icon={faBookReader}/>
        My Books
      </h2>
      
      <ShelvesList books={myBooks} shelfNames={['read', 'reading', 'to-read']}/>

      <div className={styles.shelves}>
        <Shelf shelfName='read' shelfBooks={booksRead} setMyBooks={setMyBooks}/>
        <Shelf shelfName='reading' shelfBooks={booksReading} setMyBooks={setMyBooks}/>
        <Shelf shelfName='to-read' shelfBooks={booksToRead} setMyBooks={setMyBooks}/>
      </div>
    </div>
  )
}


