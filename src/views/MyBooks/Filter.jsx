/* eslint-disable react/prop-types */
import styles from './MyBooks.module.css'
import titlecase from '../../utility/titlecase';

export default function Filter({ onInputChange, onSelect }) {
    const categories = ['all', 'fiction', 'philosophy', 'drama', 'poetry', 'history', 'science'];
    const categoryOptions = categories.map((category, index) => {
      return (
        <option key={index} value={category}>{titlecase(category)}</option>
      )
    })
    
    return (
      <div className={styles.filter}>
        <input onChange={onInputChange} placeholder='Filter by title or author'/>
        <div className={styles.category}>
          Filter by category
          <select onChange={onSelect}>
            {categoryOptions}
          </select>
        </div>
      </div>
    )
  }