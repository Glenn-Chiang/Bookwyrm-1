const API_KEY = import.meta.env.VITE_API_KEY; // Google Books API key

export default async function fetchResults(searchType, searchTerms, startIndex, maxResults, sortOrder) {
    try {
      const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}&q=in${searchType}:${searchTerms}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${sortOrder}`
        );
      
      if (response.ok) {
        const data = await response.json();
        const results = data.totalItems ? data.items : []; 
        return results;
      }
  
      else {
        throw new Error('Error fetching books');
      }
    } catch(error) {
      console.log('Error fetching books', error);
      throw error;
    }
  
}
  