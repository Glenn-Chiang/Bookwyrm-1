/* eslint-disable react/prop-types */
import titlecase from '../../utility/titlecase';
import styles from './ShelfPreview.module.css'

export default function ShelfPreview({ shelfName, books }) {
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
      {titlecase(shelfName)}
      <ul className={styles.books}>
        {listItems}
      </ul>
    </div>
  )
}