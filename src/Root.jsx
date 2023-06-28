// import styles from './App.module.css';
import { Outlet, useNavigation } from 'react-router-dom';
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

  // Loading 
  const navigation = useNavigation();

  return (
    <>
      <Banner/>
      <AuthContext.Provider value={user}>
        <Navbar/> 
        <div id='content'>
          {navigation.state === 'loading' ? <p>Loading</p> : <Outlet/>}
        </div>
      </AuthContext.Provider>
    </>
  )
}
