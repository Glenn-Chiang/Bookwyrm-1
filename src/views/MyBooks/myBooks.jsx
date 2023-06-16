import { useEffect, useState } from "react"

export default function MyBooks() {
    const [books, setBooks] = useState({});

    useEffect(() => {
        const myBooks = JSON.parse(localStorage.getItem('myBooks'));
        const readShelf = myBooks.read;
        const readingShelf = myBooks.reading;
        const toReadShelf = myBooks['to-read'];

        setBooks(myBooks);
    })
    
    return (
        
    )
}