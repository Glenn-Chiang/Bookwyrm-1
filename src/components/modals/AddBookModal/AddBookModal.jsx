/* eslint-disable react/prop-types */
import styles from './AddBookModal.module.css'
import modalStyles from '../modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faCalendarPlus, faCheckCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import RatingDropdown from '../../RatingDropdown/RatingDropdown';
import CloseButton from '../../CloseButton/CloseButton';
import { useState } from 'react';

import titlecase from '../../../utility/titlecase'
import addBook from '../../../crudFunctions/addBook'

export default function AddBookModal({book, handleClose: closeModal}) {
  const [selectedStatus, setSelectedStatus] = useState('read');
  const [rating, setRating] = useState(10);

  const handleRatingOption = event => {
    setRating(event.target.value);
  }
  
  const handleSubmit = async event => { // Confirm add book to myBooks
    event.preventDefault();
    // Update book properties
    book.status = selectedStatus;  
    if (selectedStatus === 'read') {
      book.rating = rating;
    }
    book.dateAdded = new Date();
    book.shelves = [];

    try {
      await addBook(book);
      alert(`${book.title} by ${book.authors[0]} has been added to your '${titlecase(selectedStatus)}' shelf!`);
    } catch (error) {
      alert(error.message);
    }

    closeModal();
  }

  const handleStatusChange = event => {
    setSelectedStatus(event.target.value);
  }

  return (
    <div className={modalStyles.modalBackground}>
      <div className={modalStyles.modalBox}>
        <CloseButton onClick={closeModal}/>

        <h1 className={modalStyles.header}>
          <FontAwesomeIcon icon={faCirclePlus}/>
          Add Book
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
              <input type='radio' name='status' value='read' onChange={handleStatusChange} checked={selectedStatus === 'read'}/>
              Read
              <FontAwesomeIcon icon={faCheckCircle}/>
            </label>
            <label>
              <input type='radio' name='status' value='reading' onChange={handleStatusChange} checked={selectedStatus === 'reading'}/>
              Reading
              <FontAwesomeIcon icon={faBookBookmark}/>
            </label>
            <label>
              <input type='radio' name='status' value='to-read' onChange={handleStatusChange} checked={selectedStatus === 'to-read'}/>
              To-Read
              <FontAwesomeIcon icon={faCalendarPlus}/>
            </label>
          </fieldset>

          {selectedStatus === 'read' &&
            <label className={styles.rating}>
              Rating
              <RatingDropdown initialRating={10} handleRatingOption={handleRatingOption}/>
            </label>
          }

          <div className={styles.buttons}>
            <button className={styles.submit} onClick={handleSubmit}>
              {`Add to ${titlecase(selectedStatus)}`}
            </button>  
          </div>
        </form>
      </div>
    </div>
  )
}

