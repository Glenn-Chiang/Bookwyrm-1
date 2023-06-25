// import styles from './App.module.css';
import { useState } from 'react';
import Search from './views/Search/Search.jsx';
import MyBooks from './views/MyBooks/myBooks.jsx';
import Profile from './views/Profile/Profile.jsx';
import Banner from './components/Banner/Banner.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import SignIn from './views/SignIn/SignIn.jsx';
import SignUp from './views/SignUp/SignUp.jsx';
import MyShelves from './views/MyShelves/MyShelves.jsx';
import SignOut from './views/SignOut/SignOut.jsx';

export default function App() {
  const [view, setView] = useState('myBooks');

  const currentPage = view === 'search' ? <Search/> : view === 'myShelves' ? <MyShelves/> : view === 'myBooks' ? <MyBooks/> : view === 'profile' ? <Profile/> : view === 'signIn' ? <SignIn setView={setView}/> : view === 'signUp' ? <SignUp setView={setView}/> : <SignOut setView={setView}/>

  return (
    <>
      <Banner/>
      <Navbar currentView={view} handleClick={setView}/>
      {currentPage}
    </>
  )
}
