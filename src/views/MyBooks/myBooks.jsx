/* eslint-disable react/prop-types */
import { useState } from "react"
import styles from './myBooks.module.css'
import titlecase from "../../utility/titlecase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark, faBookReader, faCalendarDay, faCalendarPlus, faCheckCircle,faImage, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import RatingDropdown from "../../components/RatingDropdown/RatingDropdown";
import Pagination from "../../components/Pagination/Pagination";
import InfoButton from "../../components/InfoButton/InfoButton";
import InfoModal from "../../components/modals/InfoModal/InfoModal"

export default function MyBooks() {
  const [allBooks, setAllBooks] = useState(JSON.parse(localStorage.getItem('myBooks')));
  console.log('fuck you')
  const booksRead = allBooks.read;
  const booksReading = allBooks.reading;
  const booksToRead = allBooks['to-read'];
  

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>
        <FontAwesomeIcon icon={faBookReader}/>
        My Books
      </h2>
      
      <div className={styles.shelves}>
        <Shelf shelfName='read' shelfBooks={booksRead} allBooks={allBooks} setAllBooks={setAllBooks}/>
        <Shelf shelfName='reading' shelfBooks={booksReading} allBooks={allBooks} setAllBooks={setAllBooks}/>
        <Shelf shelfName='to-read' shelfBooks={booksToRead} allBooks={allBooks} setAllBooks={setAllBooks}/>
      </div>
    </div>
  )
}

function Shelf({shelfName, shelfBooks, allBooks, setAllBooks}) {
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 5;
  const startIndex = currentPage * booksPerPage;
  
  const [filterTerm, setFilterTerm] = useState('');
  
  const handleInputChange = event => {
    setFilterTerm(event.target.value);
    setCurrentPage(0);
  }

  const filterBooks = () => {
    if (!filterTerm) {
      return shelfBooks;
    }
    const filteredBooks = shelfBooks.filter(book => {
      return book.title.toLowerCase().includes(filterTerm.toLowerCase()) || book.authors[0].toLowerCase().includes(filterTerm.toLowerCase());
    })
    return filteredBooks;
  }

  const filteredBooks = filterBooks();

  const [sortOrder, setSortOrder] = useState('dateAdded');
  const sortedBooks = sortOrder === 'dateAdded'
                    ? filteredBooks // Original array is already in order of dateAdded
                    : sortOrder === 'rating'
                    ? filteredBooks.slice().sort((a,b) => b.rating - a.rating)
                    : sortOrder === 'title'
                    ? filteredBooks.slice().sort((a,b) => a.title.localeCompare(b.title))
                    : filteredBooks.slice().sort((a,b) => a.authors[0].localeCompare(b.authors[0]))

  const handleSelect = event => {
    setSortOrder(event.target.value);
    setCurrentPage(0);
  }

  const displayedBooks = sortedBooks.slice(startIndex, startIndex + booksPerPage).map((book, index) => {
    return (
      <tr key={book.id} className={styles.book}>
        <td>
          {startIndex + index + 1}
        </td>
        <td>
          <img src={book.coverImg}></img>
        </td>
        <td>{book.title}</td>
        <td>{book.authors.join(', ')}</td>
        <td>{book.dateAdded}</td>

        {shelfName === 'read' && 
          <td>
            <RatingDropdown initialRating={book.rating} handleRatingOption={event => updateRating(book.id, event.target.value)}/>
          </td>
        }
        <td>
          <div className={styles.buttons}>
            <InfoButton handleClick={() => setInfoBook(book)}/>
            <button>
              Status
            </button>
            <button onClick={() => removeBook(book.id)}>
              Remove
            </button>
          </div>
        </td>
      </tr>
    )
  })
  
  
  const handleNext = () => {
    if (startIndex + booksPerPage >= filteredBooks.length) {
      return;
    }
    setCurrentPage(currentPage + 1);
  }
  
  const handlePrev = () => {
    if (currentPage === 0) {
      return;
    }
    setCurrentPage(currentPage - 1);
  }
  
  const [infoBook, setInfoBook] = useState(null); // InfoModal shows info for this book
  
  const removeBook = targetId => {
    const targetIndex = shelfBooks.findIndex(book => book.id === targetId);
    shelfBooks.splice(targetIndex, 1);
    localStorage.setItem('myBooks', JSON.stringify(allBooks));
    
    setAllBooks({...allBooks, shelfName: shelfBooks});
  }

  const updateRating = (id, newRating) => {
    const targetBook = shelfBooks.find(book => book.id === id);
    targetBook.rating = newRating;
    localStorage.setItem('myBooks', JSON.stringify(allBooks));
  }

  return (
    <>
      <h3 className={styles.shelfHeader}>
        <FontAwesomeIcon icon={shelfName === 'read' ? faCheckCircle : shelfName === 'reading' ? faBookBookmark : faCalendarPlus}/>
        {titlecase(shelfName)}
      </h3>

      <div className={styles.tableOptions}>
        <div className={styles.filter}>
          <input onChange={handleInputChange} placeholder='Filter by title or author'/>
        </div>

        <Pagination className={styles.pagination} handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage + 1}/>
        
        <div className={styles.sortOrder}>
          Sort by
          <select defaultValue='dateAdded' onChange={handleSelect}>
            <option value='dateAdded'>Date added</option>
            <option value='rating'>Rating</option>
            <option value='author'>Author (A-Z)</option>
            <option value='title'>Title (A-Z)</option>
          </select>
        </div>
      </div>

      <table className={styles.shelfBooks}>
        <thead>
          <tr>
            <th className={styles.index}></th>
            <th className={styles.cover}>
              <FontAwesomeIcon icon={faImage}/>
              Cover
            </th>
            <th className={styles.title}>
              Title
            </th>
            <th className={styles.author}>
              <FontAwesomeIcon icon={faUser}/>
              Author
            </th>
            <th className={styles.dateAdded}>
            <FontAwesomeIcon icon={faCalendarDay}/>
              Date added
            </th>
            {shelfName === 'read' && 
              <th>
                <FontAwesomeIcon icon={faStar}/>
                Rating
              </th>
            } 
            <th></th>
          </tr>
        </thead>
        <tbody>
        {displayedBooks.length === 0 
          ? <tr><td colSpan={shelfName === 'read' ? 7 : 6}>No books have been added to this shelf</td></tr>
          : displayedBooks
        }
          
        </tbody>
      </table>
      {infoBook && <InfoModal book={infoBook} handleClose={() => setInfoBook(null)}/>}
    </>
  )
}