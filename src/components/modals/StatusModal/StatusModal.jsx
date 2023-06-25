/* eslint-disable react/prop-types */
import styles from '../AddBookModal/AddBookModal.module.css'
import modalStyles from '../modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faBookBookmark, faCalendarPlus, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import CloseButton from '../../CloseButton/CloseButton'
import updateBook from '../../../crudFunctions/updateBook'
import titlecase from '../../../utility/titlecase'
import getBooks from '../../../crudFunctions/getBooks';

export default function StatusModal({ book, handleClose: closeModal, setBooks }) {

  const [selectedStatus, setSelectedStatus] = useState(book.status);

  const handleSubmit = async event => { // Confirm add book to myBooks
    event.preventDefault();
    if (selectedStatus === book.status) { // Status not changed -> do nothing
      closeModal();
      return;
    }
    // Update database
    await updateBook(book.id, {dateAdded: new Date(), status: selectedStatus});
    alert(`${book.title} by ${book.authors[0]} has been moved to your '${titlecase(selectedStatus)}' shelf!`)
    // Update local state
    const updatedBooks = await getBooks();
    setBooks(updatedBooks);
    closeModal();
  }

  const handleStatusChange = event => {
    setSelectedStatus(event.target.value);
  }

  return (
    <div className={modalStyles.modalBackground}>
      <div className={modalStyles.modalBox}>
        <CloseButton onClick={closeModal} />
        <h1 className={modalStyles.header}>
          <FontAwesomeIcon icon={faBarsProgress} />
          Update Status
        </h1>
        <div className={styles.info}>
          <p>
            <span>Title</span> <span>{book.title}</span>
          </p>
          <p>
            <span>Authors</span> <span>{book.authors.join(', ')}</span>
          </p>
          <p>
            <span>Publisher</span> <span>{book.publisher}</span>
          </p>
        </div>
        <form className={styles.form}>
          <fieldset className={styles.status}>
            <legend>Status</legend>
            <label>
              <input type='radio' name='status' value='read' onChange={handleStatusChange} checked={selectedStatus === 'read'} />
              Read
              <FontAwesomeIcon icon={faCheckCircle} />
            </label>
            <label>
              <input type='radio' name='status' value='reading' onChange={handleStatusChange} checked={selectedStatus === 'reading'}/>
              Reading
              <FontAwesomeIcon icon={faBookBookmark} />
            </label>
            <label>
              <input type='radio' name='status' value='to-read' onChange={handleStatusChange} checked={selectedStatus === 'to-read'}/>
              To-Read
              <FontAwesomeIcon icon={faCalendarPlus} />
            </label>
          </fieldset>

          <div className={styles.buttons}>
            <button className={styles.submit} onClick={handleSubmit}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

