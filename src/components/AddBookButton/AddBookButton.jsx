/* eslint-disable react/prop-types */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './AddBookButton.module.css'

export default function AddBookButton({handleClick}) {
  return (
    <button className={styles.add} onClick={handleClick}>
      <FontAwesomeIcon icon={faPlus} />
      Add Book
    </button>
  )
}