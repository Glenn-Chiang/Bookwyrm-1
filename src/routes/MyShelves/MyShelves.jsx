import { useEffect, useState } from "react";
import AddShelfModal from "../../components/modals/AddShelfModal/AddShelfModal";
import Shelf from "../../components/Shelf/Shelf";
import ShelvesList from "../../components/ShelvesList/ShelvesList";

import getBooks from "../../crudFunctions/getBooks";
import getShelves from "../../crudFunctions/getShelves";

import styles from './MyShelves.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../firebase";

export default function MyShelves() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const userBooks = await getBooks();
      const readBooks = userBooks.filter(book => book.status === 'read');
      setBooks(readBooks);
    })();
  }, [])

  const [shelfNames, setShelfNames] = useState([]);

  useEffect(() => {
    (async () => {
      const userShelves = await getShelves();
      if (userShelves) {
        setShelfNames(userShelves);
      }
    })();
  }, [])


  // Which shelf to display on the page. When user clicks 'view shelf' button, that shelf will be displayed
  const [displayedShelf, setDisplayedShelf] = useState(null);

  // Hide or show AddShelf modal
  const [showAddShelf, setShowAddShelf] = useState(false);

  if (!auth.currentUser) {
    return <p>Sign in to view your shelves</p>
  }

  if (displayedShelf) {
    const shelfBooks = books.filter(book => book.shelves && book.shelves.includes(displayedShelf));
    return (
      <>
        <button className={styles.backBtn} onClick={() => setDisplayedShelf(null)}>
          Back to My Shelves
        </button>
        <Shelf shelfName={displayedShelf} shelfBooks={shelfBooks} setMyBooks={setBooks}/>
        <button className={styles.backBtn} onClick={() => setDisplayedShelf(null)}>
          Back to My Shelves
        </button>
      </>
    );
  }

  return (
    <div>
      <div className={styles.header}>
        <h2>
          My Shelves
        </h2>

        <p>
          Create custom shelves to organise books that you have read
        </p>

        <div className={styles.addShelf}>
          <button className={styles.addShelfBtn} onClick={() => setShowAddShelf(true)}>
            Add a Shelf
            <FontAwesomeIcon icon={faPlusSquare}/>
          </button>
        </div>
      </div>

      { showAddShelf && <AddShelfModal shelfNames={shelfNames} setShelfNames={setShelfNames} closeModal={() => setShowAddShelf(false)}/>}

      { shelfNames && <ShelvesList books={books} shelfNames={shelfNames} setDisplayedShelf={setDisplayedShelf}/> }

    </div>
  )
}