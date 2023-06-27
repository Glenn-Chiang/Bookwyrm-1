import ShelfPreview from "./ShelfPreview";

/* eslint-disable react/prop-types */
export default function ShelvesList({ books, shelfNames, setDisplayedShelf }) {
  console.log(shelfNames)
  const shelfPreviews = shelfNames.map((shelfName, shelfIndex) => {
    const shelfBooks = books.filter(book => (book.shelves && book.shelves.includes(shelfName)) || book.status === shelfName);

    return (
      <ShelfPreview key={shelfIndex} books={shelfBooks} shelfName={shelfName} setDisplayedShelf={setDisplayedShelf}/>
    )
  })

  return (
    <div>
      {shelfPreviews}
    </div>
  )
}

