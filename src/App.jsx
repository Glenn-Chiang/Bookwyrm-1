// import styles from './App.module.css';
// const API_KEY = import.meta.env.VITE_API_KEY;
import { useEffect, useState } from 'react';
import Home from './views/Home/home.jsx';
import MyBooks from './views/MyBooks/myBooks.jsx';
import Banner from './components/Banner/Banner.jsx';
import Navbar from './components/Navbar/navbar.jsx';

export default function App() {
  const [view, setView] = useState('home');

  const currentPage = view === 'home' ? <Home/> : <MyBooks/>

  useEffect(() => {
    const myBooks = {
      read: [],
      reading: [],
      'to-read': []
    };

    if (!localStorage.getItem('myBooks')) {
      localStorage.setItem('myBooks', JSON.stringify(myBooks));
    }
  }, []) // Empty dependency array so that effect only runs once on initial render

  return (
    <>
      <Banner/>
      <Navbar handleClick={setView}/>
      {currentPage}
    </>
  )
}
