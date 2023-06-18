/* eslint-disable react/prop-types */
import styles from './InfoModal.module.css'
import modalStyles from '../modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import AddBookButton from '../../AddBookButton/AddBookButton';

export default function InfoModal({ handleClose, setSelectedAdd, book }) {
  if (!book) {
    return;
  }

  return (
    <div className={modalStyles.modalBackground}>
      <div className={modalStyles['modalBox-scrollable']}>
        <button className={modalStyles.close} onClick={handleClose}>
          <FontAwesomeIcon icon={faClose}/>
        </button>
        <h1 className={styles.header}>
          <div>
            <FontAwesomeIcon icon={faInfoCircle}/>
            Info
          </div>
          <AddBookButton handleClick={() => {
              setSelectedAdd(book);
              handleClose();
            }
          }/>
        </h1>
        <div className={styles.info}>
          <p>
            <span>ID:</span>
            <span>{book.id}</span>
          </p>
          <p>
            <span>Title:</span>
            <span>{book.title}</span>
          </p>
          <p>
            <span>Authors:</span>
            <span>{book.authors.join(', ')}</span>
          </p>
          <p>
            <span>Publisher:</span>
            <span>{book.publisher}</span>
          </p>
          <p>
            <span>Published date:</span>
            <span>{book.publishedDate}</span>
          </p>
          <p>
            <span>Page count:</span>
            <span>{book.pageCount}</span>
          </p>
          <p>
            <span>Categories:</span>
            <span>{book.categories}</span>
          </p>
          <p className={styles.description}>
            <span>Description:</span>
            <span>{book.description}</span>
          </p>
        </div>
      </div>
    </div>
  )
}