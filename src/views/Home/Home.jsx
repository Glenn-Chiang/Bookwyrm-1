/* eslint-disable react/prop-types */
const API_KEY = import.meta.env.VITE_API_KEY;

import Pagination from "../../components/Pagination/Pagination";
import AddBookButton from "../../components/AddBookButton/AddBookButton";
import InfoButton from "../../components/InfoButton/InfoButton";
import InfoModal from '../../components/modals/InfoModal/InfoModal'
import AddBookModal from "../../components/modals/AddBookModal/AddBookModal";

import styles from './home.module.css'
import { useEffect, useState } from 'react'

async function fetchResults(searchType, searchTerms, startIndex, maxResults, sortOrder) {
  try {
    let response;

    if (searchType === 'title') {
      response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}&q=intitle:${searchTerms}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${sortOrder}`
      );
    } else if (searchType === 'author') {
      response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}&q=inauthor:${searchTerms}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
    }
    
    if (response.ok) {
      const data = await response.json();
      const results = data.totalItems ? data.items : []; 
      return results;
    }

    else {
      throw new Error('Error fetching books');
    }
  } catch(error) {
    console.log(error);
    throw error;
  }

}

function getBooks(results) {
  const books = results.map(result => {
    const bookInfo = result.volumeInfo;
    return {
      id: result.id,
      title: bookInfo.title,
      authors: bookInfo.authors ? bookInfo.authors : ['-'], // No authors
      coverImg: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : '', // No image available
      publisher: bookInfo.publisher ? bookInfo.publisher : '-', // No publisher
      
      categories: bookInfo.categories,
      pageCount: bookInfo.pageCount,
      description: bookInfo.description,
      printType: bookInfo.printType,
      publishedDate: bookInfo.publishedDate
    }
  })

  return books;
}


function SearchForm({ setSearchResults, startIndex, setStartIndex, maxResults }) {
  const [searchType, setSearchType] = useState('title');
  const [sortOrder, setSortOrder] = useState('relevance');

  const [searchTerms, setSearchTerms] = useState(''); // Will update ONLY when search button is clicked. Therefore, even if we change the input value, the app will still 'remember' the last search term
  const [inputValue, setInputValue] = useState(''); // Will continuously update whenever the user types

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };
  
  
  // Triggered when user clicks search button
  const handleSearch = event => {
    event.preventDefault();
    if (!inputValue) { // Ignore blank input
      return;
    }

    setSearchTerms(inputValue);
    setStartIndex(0);
  }
  
  // Triggered when user selects different search type
  const handleSearchTypeChange = event => {
    setSearchType(event.target.value);
    setStartIndex(0);
  }

  const handleSortOrderChange = event => {
    setSortOrder(event.target.value);
    setStartIndex(0);
  }

  // Get the current list of results that will be shown on the current page
  useEffect(() => {
    if (!searchTerms) {
      setSearchResults([]);
      return;
    }

    (async () => {    
      try {
        const rawResults = await fetchResults(searchType, searchTerms, startIndex, maxResults, sortOrder);
        const books = getBooks(rawResults);
        setSearchResults(books);
      } catch (error) {
        console.log(error);
        // if (error instanceof TypeError) { // gone beyond last page of results, thus rawResults is undefined

        // }
      }
    })();
    
  }, [searchType, sortOrder, searchTerms, startIndex])


  return (
    <form className={styles['search-form']} onSubmit={handleSearch}>
      <h2>Search for a Book</h2>
      <div>
        <div></div>
        <input id='search-bar' className={styles.searchbar} onChange={handleInputChange}></input>
        <button className={styles.searchBtn} type='submit'>Search</button>
      </div>
      <p className={searchTerms ? styles.show : styles.hide}>{`Showing results for: "${searchTerms}"`}</p>
      <div className={styles.searchParams}>
        <div className={styles.searchFor}>
          Search by
          <select onChange={handleSearchTypeChange}>
            <option value='title'>Title</option>
            <option value='author'>Author</option>
          </select>
        </div>
        <div className={styles.sortBy}>
          Sort results by
          <select onChange={handleSortOrderChange}>
            <option value='relevance'>Relevance</option>
            <option value='newest'>Newest</option>
          </select>
        </div>
      </div>
    </form>
  )
}


function ResultsList({ results: books, setSelectedInfo, setSelectedAdd }) {
  const resultsItems = books.map((book, idx) => {
    return (
      <li key={idx}>
        <div className={styles.cover}>
          <img src={book.coverImg} alt='No image available'></img>
        </div>
        <div className={styles.details}>
          <p className={styles.title}>
            {book.title}
          </p> 
          <p className={styles.authors}>
            Author(s): {book.authors.join(', ')}
          </p>  
          <p className={styles.publisher}>
            Publisher: {book.publisher}
          </p>

          <div className={styles.bookBtns}>
            <InfoButton handleClick={() => setSelectedInfo(book)}/>
            <AddBookButton handleClick={() => setSelectedAdd(book)}/>
          </div>
        </div>
      </li>
    )
  }
  )
  
  return (
    <ol className={styles.resultsList}>
      {books.length === 0 ? 'No books found' : resultsItems}
    </ol>
  )
}


export default function Home() {
  // const [searchType, setSearchType] = useState('Title');
  const [searchResults, setSearchResults] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 10;
  const currentPage = Math.floor(startIndex / maxResults) + 1;

  const handleNext = () => {
    if (searchResults.length === 0) {
      return;
    }
    setStartIndex(startIndex + maxResults);
  }
  
  const handlePrev = () => {
    if (startIndex < maxResults) {
      return;
    }
    setStartIndex(startIndex - maxResults);
  }

  const [selectedInfo, setSelectedInfo] = useState(null); // Result whose info button is clicked
  const [selectedAdd, setSelectedAdd] = useState(null); // Result whose add button is clicked

  return (
    <>
      <SearchForm setSearchResults={setSearchResults} startIndex={startIndex} setStartIndex={setStartIndex} maxResults={maxResults}/>
      <Pagination handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage}/>
      <ResultsList results={searchResults} setSelectedInfo={setSelectedInfo} setSelectedAdd={setSelectedAdd}/>
      <Pagination handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage}/>
      
      {selectedInfo && <InfoModal book={selectedInfo} handleClose={() => setSelectedInfo(null)} />}
      {selectedAdd && <AddBookModal modalType='addBook' book={selectedAdd} handleClose={() => setSelectedAdd(null)} />}
    </>
  )
}

