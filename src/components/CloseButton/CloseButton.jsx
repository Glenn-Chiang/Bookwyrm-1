import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './CloseButton.module.css'
/* eslint-disable react/prop-types */

export default function CloseButton({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      <FontAwesomeIcon icon={faClose}/>
    </button>
  );
}
