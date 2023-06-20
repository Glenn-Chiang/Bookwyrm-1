/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from './myBooks.module.css'
import titlecase from "../../utility/titlecase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookBookmark, faCalendarDay, faCalendarPlus, faCheckCircle,faImage, faStar, faUser } from "@fortawesome/free-solid-svg-icons"
import Pagination from "../../components/Pagination/Pagination"
import InfoModal from "../../components/modals/InfoModal/InfoModal"
import StatusModal from "../../components/modals/StatusModal/StatusModal"
import BookEntry from "./BookEntry";

export default function Shelf({ shelfName, shelfBooks, setMyBooks }) {
  
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
    
    // Filter by search terms
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
    ? filteredBooks    // Original array is already in order of oldToNew
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
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const booksPerPage = 5;
    const startIndex = currentPage * booksPerPage;
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
  
  
    const [statusBook, setStatusBook] = useState(null); // Show status modal for this book
    const [infoBook, setInfoBook] = useState(null); // Show info modal for this book

    // Array of book entries. Book entry = table row
    const displayedBooks = sortedBooks.slice(startIndex, startIndex + booksPerPage).map((book, index) => 
      <BookEntry key={book.id} index={startIndex + index + 1} book={book} shelfName={shelfName} setInfoBook={setInfoBook} setStatusBook={setStatusBook} setMyBooks={setMyBooks}/>)
  
    return (
      <div className={styles.shelf}>
        <h3 className={styles.shelfHeader}>
          <FontAwesomeIcon icon={shelfName === 'read' ? faCheckCircle : shelfName === 'reading' ? faBookBookmark : faCalendarPlus}/>
          {titlecase(shelfName)}
        </h3>
  
        <div className={styles.tableOptions}>
          <Filter onInputChange={handleInputChange} onSelect={handleSelectCategory}/>
          <Pagination className={styles.pagination} handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage + 1} numPages={numPages ? numPages : 1}/>
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
        {statusBook && <StatusModal book={statusBook} handleClose={() => setStatusBook(null)}/>}
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
  
  
  