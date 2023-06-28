/* eslint-disable react/prop-types */
import styles from './myBooks.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookReader } from "@fortawesome/free-solid-svg-icons"

import Shelf from "../../components/Shelf/Shelf"
import ShelvesList from "../../components/ShelvesList/ShelvesList"

import { useContext, useState } from "react"
import { AuthContext } from '../../authContext'
import { useLoaderData } from 'react-router-dom'



export default function MyBooks() {
  const user = useContext(AuthContext);
  
  // Retrieve user's books when the component mounts
  const [myBooks, setMyBooks] = useState(useLoaderData());

  const [displayedShelf, setDisplayedShelf] = useState(null);
  

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
    <>
      { 
        user ? 
          <div className={styles.main}>
            <h2 className={styles.header}>
              <FontAwesomeIcon icon={faBookReader}/>
              My Books
            </h2>
            
            <ShelvesList books={myBooks} shelfNames={['read', 'reading', 'to-read']} setDisplayedShelf={setDisplayedShelf}/>
          </div>
        
        : <p>Sign in to view your books</p>
      }
    </>
  )
}


