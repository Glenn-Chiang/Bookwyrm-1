/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import styles from './Navbar.module.css'

export default function Navbar() {
  const currentView = 'myBooks';
  return (
    <nav>
      <ul className={styles.navbar}>
        <li className={currentView === 'search' ? styles.underlined : undefined} >
          <Link to='search'>Search</Link>
        </li>
        <li className={currentView === 'myShelves' ? styles.underlined : undefined}  >
          <Link to='myShelves'>My Shelves</Link>
        </li>
        <li className={currentView === 'myBooks' ? styles.underlined : undefined} >
          <Link to='myBooks'>My Books</Link>
        </li>
        <li className={currentView === 'profile' ? styles.underlined : undefined} >
          <Link to='profile'>Profile</Link>
        </li>
        { auth.currentUser ?
          <li className={currentView === 'signOut' ? styles.underlined : undefined} >
            <Link to='signOut'>Sign Out</Link>
          </li> :
          <li className={(currentView === 'signIn' || currentView === 'signUp') ? styles.underlined : undefined} >
            <Link to='signIn'>Sign In</Link>
          </li>
        }
      </ul>
    </nav>
  )
}