/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import styles from './myBooks.module.css'
import titlecase from "../../utility/titlecase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookBookmark, faBookReader, faCalendarDay, faCalendarPlus, faCheckCircle, faImage, faStar, faT, faUser } from "@fortawesome/free-solid-svg-icons";

export default function MyBooks() {
  // const [books, setBooks] = useState({});

  // useEffect(() => {
  //   const myBooks = JSON.parse(localStorage.getItem('myBooks'));
  //   console.log(myBooks)
  //   setBooks(myBooks);
  // }, [])
  const books = JSON.parse(localStorage.getItem('myBooks'));

  const booksRead = books.read;
  const booksReading = books.reading;
  const booksToRead = books['to-read'];
  

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>
        <FontAwesomeIcon icon={faBookReader}/>
        My Books
      </h2>
      
      <div className={styles.shelves}>
        <Shelf shelfName='read' books={booksRead}></Shelf>
        <Shelf shelfName='reading' books={booksReading}></Shelf>
        <Shelf shelfName='to-read' books={booksToRead}></Shelf>
      </div>
    </div>
  )
}

function Shelf({shelfName, books}) {
  
  const bookItems = books.map((book, index) => {
    return (
      <tr key={index} className={styles.book}>
        <td>
          {index + 1}
        </td>
        <td>
          <img src={book.coverImg}></img>
        </td>
        <td>
          {book.title}
        </td>
        <td>
          {book.authors}
        </td>
        <td>
          {book.dateAdded}
        </td>
        {shelfName === 'read' && <td>{book.rating}</td>}
        <td>
          <button>
            Change shelf
          </button>
        </td>
      </tr>
    )
  })

  return (
    <>
      <h3 className={styles.shelfHeader}>
        <FontAwesomeIcon icon={shelfName === 'read' ? faCheckCircle : shelfName === 'reading' ? faBookBookmark : faCalendarPlus}/>
        {titlecase(shelfName)}
      </h3>
      <table className={styles.shelfBooks}>
        <thead>
          <tr>
            <th className={styles.index}></th>
            <th className={styles.cover}>
              <FontAwesomeIcon icon={faImage}/>
              Cover
            </th>
            <th className={styles.title}>
              Title
            </th>
            <th className={styles.author}>
              <FontAwesomeIcon icon={faUser}/>
              Author
            </th>
            <th className={styles.dateAdded}>
            <FontAwesomeIcon icon={faCalendarDay}/>
              Date added
            </th>
            {shelfName === 'read' && 
              <th>
                <FontAwesomeIcon icon={faStar}/>
                Rating
              </th>
            } 
            <th></th>
          </tr>
        </thead>
        <tbody>
        {bookItems.length === 0 
          ? <td colSpan={shelfName === 'read' ? 7 : 6}>No books have been added to this shelf</td>
          : bookItems
        }
          
        </tbody>
      </table>
    </>
  )
}