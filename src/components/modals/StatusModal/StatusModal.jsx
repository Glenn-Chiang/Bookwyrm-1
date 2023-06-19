/* eslint-disable react/prop-types */
import styles from '../AddBookModal/AddBookModal.module.css'
import modalStyles from '../modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faBookBookmark, faCalendarPlus, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import titlecase from '../../../utility/titlecase'
import getDate from '../../../utility/getDate'
import CloseButton from '../../CloseButton/CloseButton';

export default function StatusModal({ book, allBooks: myBooks, setAllBooks: setMyBooks, handleClose: closeModal }) {

  const [selectedStatus, setSelectedStatus] = useState(book.status);

  const updateStatus = () => {
    if (selectedStatus === book.status) { // Status not changed -> do nothing
      closeModal();
      return;
    }

    const myBook = myBooks.find(myBook => myBook.id === book.id);
    myBook.dateAdded = getDate(); // Date added will refer to the date on which the book was added to its current shelf
    myBook.status = selectedStatus;
    localStorage.setItem('myBooks', JSON.stringify(myBooks));
    setMyBooks([...myBooks]);
    alert(`${book.title} by ${book.authors[0]} has been moved to your '${titlecase(selectedStatus)}' shelf!`)
    closeModal();
  }

  const handleSubmit = event => { // Confirm add book to myBooks
    event.preventDefault();
    updateStatus();
  }

  const handleStatusChange = event => {
    setSelectedStatus(event.target.value);
  }

  return (
    <div className={modalStyles.modalBackground}>
      <div className={modalStyles.modalBox}>
        <CloseButton onClick={closeModal} />
        <h1 className={styles.header}>
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

