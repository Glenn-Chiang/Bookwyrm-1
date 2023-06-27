/* eslint-disable react/prop-types */
import titlecase from '../../utility/titlecase';
import styles from './ShelfPreview.module.css'

export default function ShelfPreview({ shelfName, books, setDisplayedShelf }) {
  const previewBooks = books.sort((a,b) => b.dateAdded - a.dateAdded).slice(0,6);
  const listItems = previewBooks.map((book, index) => {
    return (
      <li key={index}>
        <img src={book.coverImg}/>
      </li>
    )
  })

  return (
    <div className={styles.container}>
      {titlecase(shelfName)} ({books.length} {books.length === 1 ? 'book' : 'books'})
      <ul className={styles.books}>
        {listItems}
      </ul>
      <button onClick={() => setDisplayedShelf(shelfName)}>
        View shelf
      </button>
    </div>
  )
}