/* eslint-disable react/prop-types */
import styles from './Navbar.module.css'

export default function Navbar({ handleClick }) {
  return (
    <ul className={styles.navbar}>
      <li onClick={() => {handleClick('home')}}>
        Home
      </li>
      <li onClick={() => {handleClick('browse')}}>
        Browse
      </li>
      <li onClick={() => {handleClick('myBooks')}}>
        My Books
      </li>
      <li>
        Profile
      </li>
    </ul>
  )
}