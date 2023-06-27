/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../../firebase'
import styles from './Navbar.module.css'

export default function Navbar() {
  const currentRoute = useLocation(); // Get current route
  return (
    <nav>
      <ul className={styles.navbar}>
        <li className={currentRoute.pathname === '/search' ? styles.underlined : ''} >
          <Link to='search'>Search</Link>
        </li>
        <li className={currentRoute.pathname === '/myShelves' ? styles.underlined : ''}  >
          <Link to='myShelves'>My Shelves</Link>
        </li>
        <li className={currentRoute.pathname === '/' ? styles.underlined : ''} >
          <Link to='/'>My Books</Link>
        </li>
        <li className={currentRoute.pathname === '/profile' ? styles.underlined : ''} >
          <Link to='profile'>Profile</Link>
        </li>
        { auth.currentUser ?
          <li className={currentRoute.pathname === '/signOut' ? styles.underlined : ''} >
            <Link to='signOut'>Sign Out</Link>
          </li> :
          <li className={(currentRoute.pathname === '/signIn' || currentRoute.pathname === '/signUp') ? styles.underlined : undefined} >
            <Link to='signIn'>Sign In</Link>
          </li>
        }
      </ul>
    </nav>
  )
}