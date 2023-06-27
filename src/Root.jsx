// import styles from './App.module.css';
import { Outlet } from 'react-router-dom';
import Banner from './components/Banner/Banner.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

export default function Root() {

  return (
    <>
      <Banner/>
      <Navbar/>
      <div id='content'>
        <Outlet />
      </div>
    </>
  )
}
