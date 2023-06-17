/* eslint-disable react/prop-types */
export default function RatingDropdown({initialRating, handleRatingOption }) {
    const options = Array.from({ length: 10 }, (_, index) => (
      <option key={index} value={10 - index}>
        {10 - index}
      </option>
    ));
  
    return (
        <select defaultValue={initialRating} onChange={handleRatingOption}>
            {options}
        </select>
    )
  }