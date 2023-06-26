export default function getBooks(results) {
    const books = results.map(result => {
      const bookInfo = result.volumeInfo;
      return {
        id: result.id,
        title: bookInfo.title,
        authors: bookInfo.authors ? bookInfo.authors : ['-'], // No authors
        coverImg: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : '', // No image available
        publisher: bookInfo.publisher ? bookInfo.publisher : '-', // No publisher
        
        categories: bookInfo.categories ? bookInfo.categories : [],
        pageCount: bookInfo.pageCount ? bookInfo.pageCount : null,
        description: bookInfo.description ? bookInfo.description : '',
        printType: bookInfo.printType ? bookInfo.printType : null,
        publishedDate: bookInfo.publishedDate ? bookInfo.publishedDate : null
      }
    })
  
    return books;
  }
  