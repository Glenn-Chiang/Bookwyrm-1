// import styles from './App.module.css';
// const API_KEY = import.meta.env.VITE_API_KEY;
import { useEffect, useState } from 'react';
import Home from './views/Home/home.jsx';
import MyBooks from './views/MyBooks/myBooks.jsx';
import Profile from './views/Profile/Profile.jsx';
import Banner from './components/Banner/Banner.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

export default function App() {
  const [view, setView] = useState('home');

  const currentPage = view === 'home' ? <Home/> : view === 'myBooks' ? <MyBooks/> : <Profile/>

  useEffect(() => {
    if (localStorage.getItem('myBooks')) {
      return;
    }

    const myBooks = []

    localStorage.setItem('myBooks', JSON.stringify(myBooks));
    
  }, []) // Empty dependency array so that effect only runs once on initial render

  return (
    <>
      <Banner/>
      <Navbar handleClick={setView}/>
      {currentPage}
    </>
  )
}
