/* eslint-disable react/prop-types */
import styles from './AddBookModal.module.css'
import modalStyles from '../modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faCalendarPlus, faCheckCircle, faCirclePlus, faClose, faStar } from '@fortawesome/free-solid-svg-icons';
import InfoButton from '../../InfoButton/InfoButton';
import RatingDropdown from '../../RatingDropdown/RatingDropdown';
import { useState } from 'react';
import titlecase from '../../../utility/titlecase'
import getDate from '../../../utility/getDate'

export default function AddBookModal({book, handleClose, setSelectedInfo }) {
  const [status, setStatus] = useState('read');
  const [rating, setRating] = useState(10);

  const handleRatingOption = event => {
    setRating(event.target.value);
  }

  const handleSubmit = event => { // Confirm add book to myBooks
    event.preventDefault();

    const myBooks = JSON.parse(localStorage.getItem('myBooks'));
    for (let shelf in myBooks) {
      if (myBooks[shelf].find(myBook => myBook.id === book.id)) {
        alert(`This book is already in your '${titlecase(shelf)}' shelf!`)  
        handleClose();
        return;
      }
    }

    if (status === 'read') {
      book.rating = rating;
    }

    book.dateAdded = getDate();

    myBooks[status].push(book);
    localStorage.setItem('myBooks', JSON.stringify(myBooks));

    alert(`${book.title} by ${book.authors[0]} has been added to your '${titlecase(status)}' shelf!`);

    handleClose();
  }

  return (
    <div className={modalStyles.modalBackground}>
      <div className={modalStyles.modalBox}>

        <button className={modalStyles.close} onClick={handleClose}>
          <FontAwesomeIcon icon={faClose}/>
        </button>
        <h1 className={styles.header}>
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
              <input type='radio' name='status' checked={status === 'read'} onChange={() => setStatus('read')}/>
              Read
              <FontAwesomeIcon icon={faCheckCircle}/>
            </label>
            <label>
              <input type='radio' name='status' onChange={() => setStatus('reading')}/>
              Reading
              <FontAwesomeIcon icon={faBookBookmark}/>
            </label>
            <label>
              <input type='radio' name='status' onChange={() => setStatus('to-read')}/>
              To-Read
              <FontAwesomeIcon icon={faCalendarPlus}/>
            </label>
          </fieldset>
          {status === 'read' &&
            <label className={styles.rating}>
              Rating
              <RatingDropdown initialRating={10} handleRatingOption={handleRatingOption}/>
            </label>
          }
          <div className={styles.buttons}>
            <InfoButton handleClick={event => {
                event.preventDefault();
                setSelectedInfo(book);
                handleClose(null);
              }
            }/>
            <button className={styles.submit} onClick={handleSubmit}>
              Add to {titlecase(status)}
            </button>  
          </div>
        </form>
      </div>
    </div>
  )
}

