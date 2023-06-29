/* eslint-disable react/prop-types */
import styles from './myBooks.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookReader } from "@fortawesome/free-solid-svg-icons"

import Shelf from "../../components/Shelf/Shelf"
import ShelvesList from "../../components/ShelvesList/ShelvesList"

import { useContext, useState } from "react"
import { AuthContext } from '../../authContext'
import {  Navigate, useLoaderData, useParams } from 'react-router-dom'


export default function MyBooks() {
  const user = useContext(AuthContext);
  const userIdParam = useParams().userId;
  
  const [myBooks, setMyBooks] = useState(useLoaderData());
  
  const [displayedShelf, setDisplayedShelf] = useState(null);
  
  // If user tries to access url with another userId, redirect back to user's page
  if (user && userIdParam !== user.uid) {
    return <Navigate to={`/myBooks/${user.uid}`} />
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


