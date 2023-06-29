import { useContext, useState } from "react";
import AddShelfModal from "../../components/modals/AddShelfModal/AddShelfModal";
import Shelf from "../../components/Shelf/Shelf";
import ShelvesList from "../../components/ShelvesList/ShelvesList";

import styles from './MyShelves.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../authContext";
import { Navigate, useLoaderData, useParams } from "react-router-dom";


export default function MyShelves() {
  // If current user enters another user's id into url
  const user = useContext(AuthContext);
  const userIdParam = useParams().userId;
  
  // Load data
  const loaderData = useLoaderData();
  const [books, setBooks] = useState(loaderData.userBooks);
  const [shelfNames, setShelfNames] = useState(loaderData.userShelves);
  
  // Which shelf to display on the page. When user clicks 'view shelf' button, that shelf will be displayed
  const [displayedShelf, setDisplayedShelf] = useState(null);
  
  // Hide or show AddShelf modal
  const [showAddShelf, setShowAddShelf] = useState(false);
  
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
  
  if (user.uid !== userIdParam) {
    return <Navigate to={`/myShelves/${user.uid}`} />
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