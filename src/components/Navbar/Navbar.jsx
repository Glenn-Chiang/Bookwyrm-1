import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <ul className={styles.navbar}>
            <li>
                Home
            </li>
            <li>
                Browse
            </li>
            <li>
                My Books
            </li>
            <li>
                Profile
            </li>
        </ul>
    )
}