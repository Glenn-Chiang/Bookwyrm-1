/* eslint-disable react/prop-types */
const API_KEY = import.meta.env.VITE_API_KEY;

import Banner from "../../components/Banner/Banner"
import Navbar from '../../components/Navbar/navbar'
import Pagination from './Pagination';
import AddBookButton from "../../components/AddBookButton/AddBookButton";
import InfoButton from "../../components/InfoButton/InfoButton";
import InfoModal from '../../components/modals/InfoModal/InfoModal'
import AddBookModal from "../../components/modals/AddBookModal/AddBookModal";

import styles from './home.module.css'
import { useEffect, useState } from 'react'


async function fetchResults(searchType, searchTerms, startIndex, maxResults) {
  try {
    let response;

    if (searchType === 'Title') {
      response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}&q=intitle:${searchTerms}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
    } else {
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

function getVolumes(results) {
  const volumes = results.map(result => {
    const volumeInfo = result.volumeInfo;
    return {
      id: result.id,
      title: volumeInfo.title,
      authors: volumeInfo.authors ? volumeInfo.authors : ['-'], // No authors
      coverImg: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '', // No image available
      publisher: volumeInfo.publisher ? volumeInfo.publisher : '-', // No publisher
      
      categories: volumeInfo.categories,
      pageCount: volumeInfo.pageCount,
      description: volumeInfo.description,
      printType: volumeInfo.printType,
      publishedDate: volumeInfo.publishedDate
    }
  })

  return volumes;
}


function SearchForm({ setSearchResults, startIndex, setStartIndex, maxResults }) {
  const [searchType, setSearchType] = useState('Title');
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
  const handleOptionChange = event => {
    setSearchType(event.target.value);
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
        const rawResults = await fetchResults(searchType, searchTerms, startIndex, maxResults);
        const volumes = getVolumes(rawResults);
        setSearchResults(volumes);
      } catch (error) {
        console.log(error);
        // if (error instanceof TypeError) { // gone beyond last page of results, thus rawResults is undefined

        // }
      }
    })();
    
  }, [searchType, searchTerms, startIndex])


  return (
    <form className={styles['search-form']} onSubmit={handleSearch}>
      <div className={styles.searchFor}>
        Search for a Book by
        <select onChange={handleOptionChange}>
          <option value='Title'>Title</option>
          <option value='Author'>Author</option>
        </select>
      </div>
      <div>
        <div></div>
        <input id='search-bar' className={styles.searchbar} onChange={handleInputChange}></input>
        <button className={styles.searchBtn} type='submit'>Search</button>
      </div>
      <p className={searchTerms ? styles.show : styles.hide}>{`Showing results for: "${searchTerms}"`}</p>
    </form>
  )
}


function ResultsList({ results: volumes, setSelectedInfo, setSelectedAdd }) {
  const resultsItems = volumes.map((volume, idx) => {
    return (
      <li key={idx}>
        <div className={styles.cover}>
          <img src={volume.coverImg} alt='No image available'></img>
        </div>
        <div className={styles.details}>
          <p className={styles.title}>
            {volume.title}
          </p> 
          <p className={styles.authors}>
            Author(s): {volume.authors.join(', ')}
          </p>  
          <p className={styles.publisher}>
            Publisher: {volume.publisher}
          </p>

          <div className={styles.bookBtns}>
            <InfoButton handleClick={() => setSelectedInfo(volume)}/>
            <AddBookButton handleClick={() => setSelectedAdd(volume)}/>
          </div>
        </div>
      </li>
    )
  }
  )
  
  return (
    <ol className={styles.resultsList}>
      {volumes.length === 0 ? 'No books found' : resultsItems}
    </ol>
  )
}


export default function Home() {
  const [searchType, setSearchType] = useState('Title');
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
      
      <SearchForm setSearchResults={setSearchResults} searchType={searchType} setSearchType={setSearchType} startIndex={startIndex} setStartIndex={setStartIndex} maxResults={maxResults}/>
      <Pagination handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage}/>
      <ResultsList results={searchResults} setSelectedInfo={setSelectedInfo} setSelectedAdd={setSelectedAdd}/>
      <Pagination handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage}/>
      {selectedInfo && <InfoModal volume={selectedInfo} setSelectedInfo={setSelectedInfo} setSelectedAdd={setSelectedAdd}/>}
      {selectedAdd && <AddBookModal volume={selectedAdd} setSelectedAdd={setSelectedAdd} setSelectedInfo={setSelectedInfo}/>}
    </>
  )
}