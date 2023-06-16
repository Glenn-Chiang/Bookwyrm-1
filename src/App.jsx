// import styles from './App.module.css';
const API_KEY = import.meta.env.VITE_API_KEY;
import { useState } from 'react';
import Home from './views/Home/home.jsx';
import MyBooks from './views/MyBooks/myBooks.jsx';

export default function App() {
  const [page, setPages] = useState('home');

  const currentPage = page === 'home' ? <Home/> : <MyBooks/>

  return (
    <>
      {currentPage}
    </>
  )
}
