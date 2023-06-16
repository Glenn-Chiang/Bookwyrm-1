/* eslint-disable react/prop-types */
import styles from './AddBookModal.module.css'
import modalStyles from '../modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faCalendarPlus, faCheckCircle, faCirclePlus, faClose, faStar } from '@fortawesome/free-solid-svg-icons';
import InfoButton from '../../InfoButton/InfoButton';
import { useState } from 'react';

export default function AddBookModal({ volume, setSelectedAdd, setSelectedInfo }) {
  const [status, setStatus] = useState('Read');

  // Rating options
  const options = Array.from({ length: 10 }, (_, index) => (
    <option key={index} value={10 - index}>{10 - index}</option>
  ));

  const handleSubmit = event => {
    event.preventDefault();

  }

  return (
    <div className={modalStyles.modalBackground}>
      <div className={modalStyles.modalBox}>

        <button className={modalStyles.close} onClick={() => setSelectedAdd(null)}>
          <FontAwesomeIcon icon={faClose}/>
        </button>
        <h1 className={styles.header}>
          <FontAwesomeIcon icon={faCirclePlus}/>
          Add Book
        </h1>

        <div className={styles.info}>
          <p>
            <span>Title</span> <span>{volume.title}</span>
          </p>
          <p>
            <span>Authors</span> <span>{volume.authors.join(', ')}</span>
          </p>
          <p>
            <span>Publisher</span> <span>{volume.publisher}</span>
          </p>
        </div>
        <form className={styles.form}>
          <fieldset className={styles.status}>
            <legend>Status</legend>
            <label>
              <input type='radio' name='status' checked={status === 'Read'} onChange={() => setStatus('Read')}/>
              Read
              <FontAwesomeIcon icon={faCheckCircle}/>
            </label>
            <label>
              <input type='radio' name='status' onChange={() => setStatus('Reading')}/>
              Reading
              <FontAwesomeIcon icon={faBookBookmark}/>
            </label>
            <label>
              <input type='radio' name='status' onChange={() => setStatus('To-Read')}/>
              To-Read
              <FontAwesomeIcon icon={faCalendarPlus}/>
            </label>
          </fieldset>
          {status === 'Read' &&
            <label className={styles.rating}>
              Rating
              <FontAwesomeIcon icon={faStar}/>
              <select className={styles.rating}>
                {options}
              </select>
            </label>
          }
          <div className={styles.buttons}>
            <InfoButton handleClick={event => {
                event.preventDefault();
                setSelectedInfo(volume);
                setSelectedAdd(null);
              }
            }/>
            <button className={styles.submit} onClick={handleSubmit}>
              Add to {status}
            </button>  
          </div>
        </form>
      </div>
    </div>
  )
}

