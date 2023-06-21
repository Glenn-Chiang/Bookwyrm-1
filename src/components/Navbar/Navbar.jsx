/* eslint-disable react/prop-types */
import styles from './Navbar.module.css'

export default function Navbar({ currentView, handleClick }) {
  return (
    <ul className={styles.navbar}>
      <li className={currentView === 'home' && styles.underlined} onClick={() => handleClick('home')}>
        Home
      </li>
      <li className={currentView === 'browse' && styles.underlined}  onClick={() => handleClick('browse')}>
        Browse
      </li>
      <li className={currentView === 'myBooks' && styles.underlined} onClick={() => handleClick('myBooks')}>
        My Books
      </li>
      <li className={currentView === 'profile' && styles.underlined} onClick={() => handleClick('profile')}>
        Profile
      </li>
      <li className={(currentView === 'signIn' || currentView === 'signUp') && styles.underlined} onClick={() => handleClick('signIn')}>
        Sign In
      </li>
    </ul>
  )
}