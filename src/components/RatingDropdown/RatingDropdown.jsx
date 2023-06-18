import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './RatingDropdown.module.css'
/* eslint-disable react/prop-types */
export default function RatingDropdown({initialRating, handleRatingOption }) {
    const options = Array.from({ length: 10 }, (_, index) => (
      <option key={index} value={10 - index}>
        {10 - index}
      </option>
    ));
  
    return (
      <>
        <FontAwesomeIcon icon={faStar} className={styles.star}/>
        <select defaultValue={initialRating} onChange={handleRatingOption}>
            {options}
        </select>
      </>
    )
  }