/* eslint-disable react/prop-types */
import { useState } from "react"
import styles from './myBooks.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookReader } from "@fortawesome/free-solid-svg-icons"
import Shelf from "./Shelf"

export default function MyBooks() {
  const [myBooks, setMyBooks] = useState([]);
  
  const booksRead = myBooks.filter(book => book.status === 'read');
  const booksReading = myBooks.filter(book => book.status === 'reading');
  const booksToRead = myBooks.filter(book => book.status === 'to-read');

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>
        <FontAwesomeIcon icon={faBookReader}/>
        My Books
      </h2>
      
      <div className={styles.shelves}>
        <Shelf shelfName='read' shelfBooks={booksRead} setMyBooks={setMyBooks}/>
        <Shelf shelfName='reading' shelfBooks={booksReading} setMyBooks={setMyBooks}/>
        <Shelf shelfName='to-read' shelfBooks={booksToRead} setMyBooks={setMyBooks}/>
      </div>
    </div>
  )
}


