import { useEffect, useState } from "react";
import Shelf from "../MyBooks/Shelf";
import getBooks from "../../crudFunctions/getBooks";
import getShelves from "../../crudFunctions/getShelves";
import styles from './MyShelves.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import AddShelfModal from "../../components/modals/AddShelfModal/AddShelfModal";
import ShelvesList from "./ShelvesList";
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
      setShelfNames(userShelves);
    })();
  }, [])

  
  const shelves = shelfNames.map((shelfName, index) => {
    const shelfBooks = books.filter(book => book.shelves && book.shelves.includes(shelfName));
    return (
      <Shelf key={index} shelfName={shelfName} shelfBooks={shelfBooks} setMyBooks={setBooks}/>
    )
  })

  const [showAddShelf, setShowAddShelf] = useState(false);

  if (!auth.currentUser) {
    return <p>Sign in to view your shelves</p>
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

      {showAddShelf && <AddShelfModal shelfNames={shelfNames} closeModal={() => setShowAddShelf(false)}/>}

      <ShelvesList books={books} shelfNames={shelfNames} />

      <div className={styles.shelves}>
        {shelves}
      </div>
    </div>
  )
}