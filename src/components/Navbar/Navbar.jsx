/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../authContext';

export default function Navbar() {
  const user = useContext(AuthContext);
  return (
    <nav>
      <ul className={styles.navbar}>
        <li>
          <NavLink to='/search' className={({ isActive }) => isActive ? styles.active : '' }>
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to={user ? `/MyShelves/${user.uid}` : '/MyShelves'} className={({ isActive }) => isActive ? styles.active : '' }>
            My Shelves
          </NavLink>
        </li>
        <li>
          <NavLink to={user ? `/${user.uid}` : '/'} className={({ isActive }) => isActive ? styles.active : '' }>
            My Books
          </NavLink>
        </li>
        <li>
          <NavLink to={user ? `/profile/${user.uid}` : '/profile'} className={({ isActive }) => isActive ? styles.active : '' }>
            Profile
          </NavLink>
        </li>
        { user ?
          <li>
            <NavLink to='/signOut' className={({ isActive }) => isActive ? styles.active : '' }>
              Sign Out
            </NavLink>
          </li> :
          <li>
            <NavLink to='/signIn' className={({ isActive }) => isActive ? styles.active : '' }>
              Sign In
            </NavLink>
          </li>
        }
      </ul>
    </nav>
  )
}