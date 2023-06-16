/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import styles from './pagination.module.css'

export default function Pagination({ handleNext, handlePrev, currentPage }) {
    return (
      <div className={styles.pagination}>
        <div className={styles['page-buttons']}>
          <button onClick={handlePrev}>
            <FontAwesomeIcon icon={faChevronLeft}/>
          </button>
          <button onClick={handleNext}>
            <FontAwesomeIcon icon={faChevronRight}/>
          </button>
        </div>
        <div className={styles['page-num']}>
          Page {currentPage}
        </div>
      </div>
  
    )
  }