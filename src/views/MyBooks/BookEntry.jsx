import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './MyBooks.module.css'
import RatingDropdown from "../../components/RatingDropdown/RatingDropdown"
import InfoButton from "../../components/InfoButton/InfoButton"
import updateBook from "../../crudFunctions/updateBook";
import removeBook from "../../crudFunctions/removeBook";
import getBooks from "../../crudFunctions/getBooks"


/* eslint-disable react/prop-types */
export default function BookEntry({ book, index, shelfName, setInfoBook, setStatusBook, setMyBooks }) {
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
      <td>{book.dateAdded}</td>

      {shelfName === 'read' &&
        <td>
          <RatingDropdown initialRating={book.rating} handleRatingOption={event => updateRating(book.id, event.target.value, setMyBooks)} />
        </td>
      }
      <td>
        <div className={styles.buttons}>
          <InfoButton handleClick={() => setInfoBook(book)} />
          <StatusButton handleClick={() => setStatusBook(book)} />
          <RemoveButton handleClick={() => handleRemoveBook(book.id, setMyBooks)} />
        </div>
      </td>
    </tr>
  )
}


const handleRemoveBook = async (bookId, setMyBooks) => {
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


function RemoveButton({ handleClick }) {
  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faXmarkCircle}/>
      Remove
    </button>
  )
}


function StatusButton({ handleClick }) {
  return (
    <button onClick={handleClick}>
      Status
    </button>
  )
}