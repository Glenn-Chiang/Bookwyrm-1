/* eslint-disable react/prop-types */
import styles from './ShelvesModal.module.css'
import modalStyles from '../modal.module.css'
import CloseButton from '../../CloseButton/CloseButton'
import { useEffect, useState } from 'react'
import getBooks from '../../../crudFunctions/getBooks'
import getShelves from '../../../crudFunctions/getShelves'
import updateBook from '../../../crudFunctions/updateBook'
import titlecase from '../../../utility/titlecase'

export default function ShelvesModal({ book, handleClose: closeModal, setMyBooks }) {
  const [myShelves, setMyShelves] = useState([]);

  useEffect(() => {
    (async () => {
      const userShelves = await getShelves();
      setMyShelves(userShelves);
    })();
  }, [])

  const [selectedShelves, setSelectedShelves] = useState(book.shelves || []);

  const handleCheckboxChange = event => {
    const { value, checked } = event.target // Object destructuring
    if (checked) {
      setSelectedShelves(selectedShelves => [...selectedShelves, value]); // Check item 
    } else {
      setSelectedShelves(selectedShelves => selectedShelves.filter(shelf => shelf !== value)); // Uncheck item
    }
  }

  const shelfOptions = myShelves.map((shelfName, index) => {
    return (
      <label key={index}>
        <input type='checkbox' name='shelf' value={shelfName} onChange={handleCheckboxChange} checked={selectedShelves.includes(shelfName)}/>
        {titlecase(shelfName)}
      </label>
    )
  })

  const handleSubmit = async event => {
    event.preventDefault();
    await updateBook(book.id, { shelves: selectedShelves })
    const updatedBooks = await getBooks();
    setMyBooks(updatedBooks);
    closeModal();
  }

  return (
    <div className={modalStyles.modalBackground}>
      <div className={modalStyles.modalBox}>
        <CloseButton onClick={closeModal} />
        <h1 className={modalStyles.header}>
          Shelves
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
          <fieldset className={styles.checkboxes}>
            <legend>Shelves</legend>
            <p className={styles.note}>Note: Unchecking a shelf will remove the book from that shelf</p>
            {shelfOptions}
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

