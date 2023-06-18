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
import { render } from "react-dom";

export default function MyBooks() {
  const [allBooks, setAllBooks] = useState(JSON.parse(localStorage.getItem('myBooks')));
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
  
  // Filter by category; show all books by default
  const [category, setCategory] = useState('all');

  const handleSelectCategory = event => {
    setCategory(event.target.value);
    setCurrentPage(0);
  }

  const filterByCategory = () => {
    if (category === 'all') {
      return shelfBooks;
    }
    const categoryBooks = shelfBooks.filter(book => {
      return book.categories[0].toLowerCase().includes(category);
    })
    return categoryBooks;
  }


  // Filtering by title/author string
  const [filterTerm, setFilterTerm] = useState('');
  
  const handleInputChange = event => {
    setFilterTerm(event.target.value);
    setCurrentPage(0);
  }

  const filterBooks = books => {
    if (!filterTerm) {
      return books;
    }
    const filteredBooks = books.filter(book => {
      return book.title.toLowerCase().includes(filterTerm.toLowerCase()) || book.authors[0].toLowerCase().includes(filterTerm.toLowerCase());
    })
    return filteredBooks;
  }

  // Apply both filters
  const filteredBooks = filterBooks(filterByCategory(shelfBooks));

  // Sorting
  const [sortOrder, setSortOrder] = useState('oldToNew');
  const sortedBooks = sortOrder === 'oldToNew'
                    ? filteredBooks // Original array is already in order of oldToNew
                    : sortOrder === 'newToOld'
                    ? filteredBooks.slice().reverse()
                    : sortOrder === 'rating'
                    ? filteredBooks.slice().sort((a,b) => b.rating - a.rating)
                    : sortOrder === 'title'
                    ? filteredBooks.slice().sort((a,b) => a.title.localeCompare(b.title))
                    : filteredBooks.slice().sort((a,b) => a.authors[0].localeCompare(b.authors[0]))

  const handleSelectSort = event => {
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
            <RemoveButton targetId={book.id}/>
          </div>
        </td>
      </tr>
    )
  })
  
  const numPages = Math.floor(filteredBooks.length / booksPerPage) + (filteredBooks.length % booksPerPage === 0 ? 0 : 1);
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
  
  function RemoveButton({ targetId }) {
    const removeBook = targetId => {
      const targetIndex = shelfBooks.findIndex(book => book.id === targetId);
      shelfBooks.splice(targetIndex, 1);
      localStorage.setItem('myBooks', JSON.stringify(allBooks));
      
      setAllBooks({...allBooks, shelfName: shelfBooks});
  
      if (startIndex === filteredBooks.length) { // If we are removing the last book on a page, go to prev page
        setCurrentPage(currentPage - 1);
      }
    }

    return (
      <button onClick={() => removeBook(targetId)}>
        Remove
      </button>
    )
  }
  

  const updateRating = (id, newRating) => {
    const targetBook = shelfBooks.find(book => book.id === id);
    targetBook.rating = newRating;
    localStorage.setItem('myBooks', JSON.stringify(allBooks));
  }


  return (
    <div className={styles.shelf}>
      <h3 className={styles.shelfHeader}>
        <FontAwesomeIcon icon={shelfName === 'read' ? faCheckCircle : shelfName === 'reading' ? faBookBookmark : faCalendarPlus}/>
        {titlecase(shelfName)}
      </h3>

      <div className={styles.tableOptions}>
        <Filter onInputChange={handleInputChange} onSelect={handleSelectCategory}/>
        <Pagination className={styles.pagination} handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage + 1} numPages={numPages}/>
        <SortDropdown sortOrder={sortOrder} onSelect={handleSelectSort}/>
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
          ? <tr><td colSpan={shelfName === 'read' ? 7 : 6}>No books found</td></tr>
          : displayedBooks
        }
          
        </tbody>
      </table>
      {infoBook && <InfoModal book={infoBook} handleClose={() => setInfoBook(null)}/>}
    </div>
  )
}


function Filter({ onInputChange, onSelect }) {
  const categories = ['all', 'fiction', 'philosophy', 'drama', 'poetry', 'history'];
  const categoryOptions = categories.map((category, index) => {
    return (
      <option key={index} value={category}>{titlecase(category)}</option>
    )
  })
  
  return (
    <div className={styles.filter}>
      <input onChange={onInputChange} placeholder='Filter by title or author'/>
      <div className={styles.category}>
        Filter by category
        <select onChange={onSelect}>
          {categoryOptions}
        </select>
      </div>
    </div>
  )
}


function SortDropdown({sortOrder, onSelect}) {
  return (
    <div className={styles.sortOrder}>
      Sort by
      <select defaultValue={sortOrder} onChange={onSelect}>
        <option value='oldToNew'>Oldest</option>
        <option value='newToOld'>Newest</option>
        <option value='rating'>Rating</option>
        <option value='author'>Author (A-Z)</option>
        <option value='title'>Title (A-Z)</option>
      </select>
    </div>
  )
}