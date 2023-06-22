/* eslint-disable react/prop-types */
import modalStyles from '../modal.module.css'
import styles from './AddShelfModal.module.css'
import CloseButton from '../../CloseButton/CloseButton'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import createShelf from '../../../crudFunctions/createShelf'

export default function AddShelfModal({ closeModal }) {
  const [shelfName, setShelfName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    createShelf(shelfName);
    closeModal();
  }

  return (
    <div className={modalStyles.modalBackground}>
      <div className={modalStyles.modalBox}>      
        <CloseButton onClick={closeModal}/>
        <h1 className={modalStyles.header}>
          <FontAwesomeIcon icon={faCirclePlus}/>
          Add Shelf
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Shelf name
            <input required placeholder='e.g. Favourites' onChange={event => setShelfName(event.target.value)}/>
          </label>
          <button>
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}
