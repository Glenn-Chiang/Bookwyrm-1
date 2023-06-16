/* eslint-disable react/prop-types */
import styles from './InfoModal.module.css'
import modalStyles from '../modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import AddBookButton from '../../AddBookButton/AddBookButton';

export default function InfoModal({ setSelectedInfo, setSelectedAdd, volume }) {
  if (!volume) {
    return;
  }

  return (
    <div className={modalStyles.modalBackground}>
      <div className={modalStyles['modalBox-scrollable']}>
        <button className={modalStyles.close} onClick={() => setSelectedInfo(null)}>
          <FontAwesomeIcon icon={faClose}/>
        </button>
        <h1 className={styles.header}>
          <div>
            <FontAwesomeIcon icon={faInfoCircle}/>
            Info
          </div>
          <AddBookButton handleClick={() => {
              setSelectedAdd(volume);
              setSelectedInfo(null);
            }
          }/>
        </h1>
        <div className={styles.info}>
          <p>
            <span>ID:</span>
            <span>{volume.id}</span>
          </p>
          <p>
            <span>Title:</span>
            <span>{volume.title}</span>
          </p>
          <p>
            <span>Authors:</span>
            <span>{volume.authors.join(', ')}</span>
          </p>
          <p>
            <span>Publisher:</span>
            <span>{volume.publisher}</span>
          </p>
          <p>
            <span>Published date:</span>
            <span>{volume.publishedDate}</span>
          </p>
          <p>
            <span>Page count:</span>
            <span>{volume.pageCount}</span>
          </p>
          <p>
            <span>Categories:</span>
            <span>{volume.categories}</span>
          </p>
          <p className={styles.description}>
            <span>Description:</span>
            <span>{volume.description}</span>
          </p>
        </div>
      </div>
    </div>
  )
}