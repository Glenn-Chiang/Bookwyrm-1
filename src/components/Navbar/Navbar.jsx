/* eslint-disable react/prop-types */
import styles from './Navbar.module.css'

export default function Navbar({ currentView, handleClick }) {
  return (
    <ul className={styles.navbar}>
      <li className={currentView === 'search' ? styles.underlined : undefined} onClick={() => handleClick('search')}>
        Search
      </li>
      <li className={currentView === 'browse' ? styles.underlined : undefined}  onClick={() => handleClick('browse')}>
        Browse
      </li>
      <li className={currentView === 'myBooks' ? styles.underlined : undefined} onClick={() => handleClick('myBooks')}>
        My Books
      </li>
      <li className={currentView === 'profile' ? styles.underlined : undefined} onClick={() => handleClick('profile')}>
        Profile
      </li>
      <li className={(currentView === 'signIn' || currentView === 'signUp') ? styles.underlined : undefined} onClick={() => handleClick('signIn')}>
        Sign In
      </li>
    </ul>
  )
}