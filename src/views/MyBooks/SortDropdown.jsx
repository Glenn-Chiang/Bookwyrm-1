/* eslint-disable react/prop-types */
import styles from './MyBooks.module.css'

export default function SortDropdown({sortOrder, onSelect}) {
    return (
      <div className={styles.sortOrder}>
        Sort by
        <select defaultValue={sortOrder} onChange={onSelect}>
          <option value='newToOld'>Newest</option>
          <option value='oldToNew'>Oldest</option>
          <option value='rating'>Rating</option>
          <option value='author'>Author (A-Z)</option>
          <option value='title'>Title (A-Z)</option>
        </select>
      </div>
    )
  }