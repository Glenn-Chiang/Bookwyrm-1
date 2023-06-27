/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import modalStyles from '../modal.module.css'
import styles from './AddShelfModal.module.css'
import CloseButton from '../../CloseButton/CloseButton'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import createShelf from '../../../crudFunctions/createShelf'
import getShelves from '../../../crudFunctions/getShelves'
import { AuthContext } from '../../../authContext'

export default function AddShelfModal({ shelfNames, setShelfNames, closeModal }) {
  const user = useContext(AuthContext);

  const [shelfName, setShelfName] = useState('');
  const validName = !['read', 'reading', 'to-read'].includes(shelfName.toLowerCase());
  const nameInUse = shelfNames.includes(shelfName.toLowerCase());

  const handleSubmit = async event => {
    event.preventDefault();

    if (!validName || nameInUse) {
      return;
    }

    try {
      createShelf(user, shelfName);
      alert(`New shelf created: '${shelfName}'`);
      const updatedShelfNames = await getShelves(user);
      setShelfNames(updatedShelfNames);
    } catch (error) {
      console.log(error);
    }

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
          { validName ||
            <p>
              Note: You cannot name your shelves 'read', 'reading', or 'to-read'
            </p>
          }
          
          { nameInUse &&
            <p>
              Note: You already have a shelf named '{shelfName}''
            </p>
          }
          
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
