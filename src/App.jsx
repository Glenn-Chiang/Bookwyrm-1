// import styles from './App.module.css';
import { useState } from 'react';
import Home from './views/Home/home.jsx';
import MyBooks from './views/MyBooks/myBooks.jsx';
import Profile from './views/Profile/Profile.jsx';
import Banner from './components/Banner/Banner.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import SignIn from './views/SignIn/SignIn.jsx';
import SignUp from './views/SignUp/SignUp.jsx';

export default function App() {
  const [view, setView] = useState('home');

  const currentPage = view === 'home' ? <Home/> : view === 'myBooks' ? <MyBooks/> : view === 'profile' ? <Profile/> : view === 'signIn' ? <SignIn setView={setView}/> : <SignUp setView={setView}/>

  return (
    <>
      <Banner/>
      <Navbar currentView={view} handleClick={setView}/>
      {currentPage}
    </>
  )
}
