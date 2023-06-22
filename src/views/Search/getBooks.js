export default function getBooks(results) {
    const books = results.map(result => {
      const bookInfo = result.volumeInfo;
      return {
        id: result.id,
        title: bookInfo.title,
        authors: bookInfo.authors ? bookInfo.authors : ['-'], // No authors
        coverImg: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : '', // No image available
        publisher: bookInfo.publisher ? bookInfo.publisher : '-', // No publisher
        
        categories: bookInfo.categories,
        pageCount: bookInfo.pageCount,
        description: bookInfo.description,
        printType: bookInfo.printType,
        publishedDate: bookInfo.publishedDate
      }
    })
  
    return books;
  }
  