import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Profile.module.css'
import { faBookBookmark, faCalendarPlus, faCheckCircle, faLineChart, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../authContext';
import { useLoaderData } from 'react-router-dom';

export default function Profile() {
  const user = useContext(AuthContext);
  
  return (
    <>
      {
        user ? 
        <>
          <h2 className={styles.header}>
            <FontAwesomeIcon icon={faUser} />
            Profile
          </h2>
          <Stats />
        </>

        : <p>Sign in to view your profile</p>
      }
    </>
  )
}

const calcAverageRating = books => {
  if (books.length === 0) {
    return '-';
  } 

  const ratingSum = books.reduce((currentSum, book) => {
    return currentSum + Number(book.rating);
  }, 0);

  const averageRating = (ratingSum / books.length).toFixed(1);
  return averageRating;
}

function Stats() {
  const myBooks = useLoaderData();
  const booksRead = myBooks.filter(book => book.status === 'read');
  const booksReading = myBooks.filter(book => book.status === 'reading');
  const booksToRead = myBooks.filter(book => book.status === 'to-read');

  return (
    <div className={styles.stats}>
      <h3 className={styles.header}>
        <FontAwesomeIcon icon={faLineChart} />
        Stats
      </h3>
      <table className={styles.statsTable}>
        <tbody>
          <tr>
            <th>
              Total books
            </th>
            <td>{myBooks.length}</td>
          </tr>
          <tr>
            <th>
              Books read
              <FontAwesomeIcon icon={faCheckCircle} />
            </th>
            <td>{booksRead.length}</td>
          </tr>
          <tr>
            <th>
              Books reading
              <FontAwesomeIcon icon={faBookBookmark} />
            </th>
            <td>{booksReading.length}</td>
          </tr>
          <tr>
            <th>
              Books to read
              <FontAwesomeIcon icon={faCalendarPlus} />
            </th>
            <td>{booksToRead.length}</td>
          </tr>
          <tr>
            <th>
              Average Rating
              <FontAwesomeIcon icon={faStar} />
            </th>
            <td>{calcAverageRating(booksRead)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}