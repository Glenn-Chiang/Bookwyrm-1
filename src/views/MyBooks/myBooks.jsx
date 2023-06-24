/* eslint-disable react/prop-types */
import { useState } from "react"
import styles from './myBooks.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookReader } from "@fortawesome/free-solid-svg-icons"
import Shelf from "./Shelf"

export default function MyBooks() {
  const [myBooks, setAllBooks] = useState(JSON.parse(localStorage.getItem('myBooks')));
  
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
        <Shelf shelfName='read' shelfBooks={booksRead} allBooks={myBooks} setAllBooks={setAllBooks}/>
        <Shelf shelfName='reading' shelfBooks={booksReading} allBooks={myBooks} setAllBooks={setAllBooks}/>
        <Shelf shelfName='to-read' shelfBooks={booksToRead} allBooks={myBooks} setAllBooks={setAllBooks}/>
      </div>
    </div>
  )
}


