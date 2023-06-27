import { faBarsProgress, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './shelf.module.css'
import RatingDropdown from "../RatingDropdown/RatingDropdown"
import InfoButton from "../InfoButton/InfoButton"
import updateBook from "../../crudFunctions/updateBook";
import removeBook from "../../crudFunctions/removeBook";
import getBooks from "../../crudFunctions/getBooks"
import formatDate from "../../utility/formatDate"

/* eslint-disable react/prop-types */
export default function BookEntry({ book, index, shelfName, setSelectedBook, setModal, setMyBooks }) {
  const handleInfoClick = book => {
    setSelectedBook(book);
    setModal('info');
  };
  
  const handleStatusClick = book => {
    setSelectedBook(book);
    setModal('status');
  };

  const handleShelfClick = book => {
    setSelectedBook(book);
    setModal('addToShelf');
  }

  return (
    <tr key={book.id} className={styles.book}>
      <td>
        {index}
      </td>
      <td>
        <img src={book.coverImg}></img>
      </td>
      <td>{book.title}</td>
      <td>{book.authors.join(', ')}</td>
      <td>{formatDate(book.dateAdded)}</td>

      {shelfName !== 'reading' && shelfName !== 'to-read' &&
        <td>
          <RatingDropdown initialRating={book.rating} handleRatingOption={event => updateRating(book.id, event.target.value, setMyBooks)} />
        </td>
      }
      <td>
        <div className={styles.buttons}>
          <InfoButton handleClick={() => handleInfoClick(book)} /> {/** Show InfoModal for this book */}
          <StatusButton handleClick={() => handleStatusClick(book)} /> {/** Show StatusModal for this book */}
          { shelfName !== 'reading' && shelfName !== 'to-read' && 
            <ShelvesButton handleClick={() => handleShelfClick(book)}/> 
          }
          <RemoveButton handleClick={() => handleRemoveBook(book.id, setMyBooks)} />
        </div>
      </td>
    </tr>
  )
}

const handleRemoveBook = async (bookId, setMyBooks) => {
  const userResponse = confirm('This book will be deleted from all your shelves. Are you sure you want to proceed?');
  if (!userResponse) {
    return;
  }
  try {
    await removeBook(bookId); // Remove book from db
    // Update local state with updated db data
    const updatedBooks = await getBooks();
    setMyBooks(updatedBooks);
  } catch (error) {
    console.log(error);
  }
}


const updateRating = async (bookId, newRating, setMyBooks) => {
  try {
    await updateBook(bookId, {rating: newRating});
    // Update local state with updated db data
    const updatedBooks = await getBooks();
    setMyBooks(updatedBooks);
  } catch (error) {
    console.log(error);
  }
}


function ShelvesButton( { handleClick }) {
  return (
    <button onClick={handleClick}>
      {/* <FontAwesomeIcon icon={fabook}/> */}
      Shelves
    </button>
  )
}

function RemoveButton({ handleClick }) {
  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faXmarkCircle}/>
      Delete
    </button>
  )
}


function StatusButton({ handleClick }) {
  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faBarsProgress}/>
      Status
    </button>
  )
}