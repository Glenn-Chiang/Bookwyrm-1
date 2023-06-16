/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './InfoButton.module.css'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default function InfoButton({ handleClick }) {
  return (
    <button className={styles.info} onClick={handleClick}>
      <FontAwesomeIcon icon={faInfoCircle}/>
      Info
    </button>
  )
}