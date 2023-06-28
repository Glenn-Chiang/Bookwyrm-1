// import styles from './App.module.css';
import { Outlet } from 'react-router-dom';
import Banner from './components/Banner/Banner.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { useEffect, useState } from 'react';
import { auth } from './firebase.js';
import { AuthContext } from './authContext.js';

export default function Root() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);


  return (
    <>
      <Banner/>
      <AuthContext.Provider value={user}>
        <Navbar/> 
        <div id='content'>
          <Outlet />
        </div>
      </AuthContext.Provider>
    </>
  )
}
