import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const GeneralQuery = ({ keywords, apiKey }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!keywords) return;

    const handleSearch = async () => {
      try {
        const { title, author, mainCategory, pageCount } = keywords || {};

        let queryParts = [];

        if (title) {
          queryParts.push(`intitle:"${encodeURIComponent(title)}"`);
        }
        if (author) {
          queryParts.push(`inauthor:"${encodeURIComponent(author)}"`);
        }
        if (mainCategory) {
          queryParts.push(`subject:"${encodeURIComponent(mainCategory)}"`);
        }

        // If no specific parts, use mainCategory as a general search term
        if (queryParts.length === 0 && mainCategory) {
          queryParts.push(encodeURIComponent(mainCategory));
        }

        // Ensure we have at least one search term
        if (queryParts.length === 0) {
          setError("No search criteria provided");
          return;
        }

        let query = `https://www.googleapis.com/books/v1/volumes?q=${queryParts.join(
          "+"
        )}`;

        // Append the API key
        query += `&key=${apiKey}`;

        console.log("Query URL:", query); // For debugging

        const response = await fetch(query);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!data.items) {
          setBooks([]);
          return;
        }

        // Filter results based on pageCount
        const filteredBooks = data.items.filter((book) => {
          const bookPageCount = book.volumeInfo.pageCount;
          return !pageCount || bookPageCount <= pageCount;
        });

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch books. Please try again.");
      }
    };

    handleSearch();
  }, [keywords, apiKey]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Google Books Search</h1>
      {books.length === 0 ? (
        <p>No books found matching your criteria.</p>
      ) : (
        <div>
          {books.map((book, index) => (
            <div key={index}>
              <h2>{book.volumeInfo.title}</h2>
              <p>Author: {book.volumeInfo.authors?.join(", ")}</p>
              <p>Page Count: {book.volumeInfo.pageCount}</p>
              <p>Category: {book.volumeInfo.categories?.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

GeneralQuery.propTypes = {
  keywords: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    mainCategory: PropTypes.string,
    pageCount: PropTypes.number,
  }),
  apiKey: PropTypes.string.isRequired,
};

export default GeneralQuery;

//********************************
// function GeneralQuery({
//   title,
//   authors,
//   pageCount,
//   mainCategory,
//   ratingsCount,
//   keywords,
// }) {
//   const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
//   const api = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
//   const [books, setBooks] = useState([]); //store the books fetched from GBA
//   const [loading, setLoading] = useState(true); // manage loading state
//   const [error, setError] = useState(null); // handle any errors that occur during fetch

//   useEffect(() => {
//     const fetchBooks = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         let queryParts = [];

//         if (title) {
//           queryParts.push(`intitle:${encodeURIComponent(title)}`);
//         }
//         if (authors) {
//           authors.forEach((author) => {
//             queryParts.push(`inauthor:${encodeURIComponent(author)}`);
//           });
//         }
//         if (mainCategory) {
//           queryParts.push(`subject:${encodeURIComponent(mainCategory)}`);
//         }
//         if (keywords) {
//           keywords.forEach((keyword) =>
//             queryParts.push(encodeURIComponent(keyword))
//           );
//         }

//         const query = queryParts.join("+");

//         if (!query) {
//           setBooks([]);
//           return;
//         }

//         const response = await fetch(
//           `${baseUrl}${query}&maxResults=40&key=${api}`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         if (!data.items) {
//           setBooks([]);
//           setLoading(false);
//           return;
//         }

//         // filter results based on additional criteria
//         const filteredBooks = (data.items || []).filter((book) => {
//           const info = book.volumeInfo;

//           if (pageCount && info.pageCount && info.pageCount > pageCount)
//             return false;
//           if (
//             ratingsCount &&
//             info.ratingsCount &&
//             info.ratingsCount < ratingsCount
//           )
//             return false;

//           return true;
//         });

//         setBooks(filteredBooks);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [title, authors, pageCount, mainCategory, ratingsCount, keywords, api]);

//   if (loading) return <div>Loading books...</div>;
//   if (error) return <div>Error fetching books: {error}</div>;

//   return (
//     <div>
//       <h2>Search Results</h2>
//       {books.length === 0 ? (
//         <p>No books found matching your criteria</p>
//       ) : (
//         <ul>
//           {books.map((book) => (
//             <li key={book.id}>
//               {book.volumeInfo.title}
//               {book.volumeInfo.authors &&
//                 ` by ${book.volumeInfo.authors.join(", ")}`}
//               {book.volumeInfo.pageCount &&
//                 ` - ${book.volumeInfo.pageCount} pages`}
//               {book.volumeInfo.ratingsCount &&
//                 ` - ${book.volumeInfo.ratingsCount} ratings`}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// GeneralQuery.propTypes = {
//   title: PropTypes.string,
//   authors: PropTypes.arrayOf(PropTypes.string),
//   pageCount: PropTypes.number,
//   mainCategory: PropTypes.string,
//   ratingsCount: PropTypes.number,
//   keywords: PropTypes.arrayOf(PropTypes.string),
// };

// export default GeneralQuery;

// Take keywords from useOpenAI hook

// Pass keywords through Google Books API in primary search method

// Pass remaining keywords though Google Books API in secondary search method (map? filter?)

// Return results to be exported to App.jsx to be displayed on DOM

// *********************************

// function GeneralQuery({ apiKey, keyword, pageCount = null }) {
//   const [books, setBooks] = useState([]);
//   const baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
//   const query = `${keyword}`;

//   useEffect(() => {
//     console.log(apiKey);
//   }, []);

//   useEffect(() => {
//     async function fetchBooks() {
//       const fullURL = `${baseURL}${query}&key=${apiKey}`;

//       try {
//         const response = await fetch(fullURL);
//         if (!response.ok) {
//           throw new Error(
//             "Network response was not okay." + response.statusText
//           );
//         }
//         const data = await response.json();

//         // Filter by pageCount if provided
//         const filteredBooks = pageCount
//           ? data.items.filter((book) => book.volumeInfo.pageCount === pageCount)
//           : data.items;

//         setBooks(filteredBooks);
//       } catch (error) {
//         console.error("Fetch error: ", error);
//       }
//     }

//     if (keyword) {
//       fetchBooks();
//     }
//   }, [query, keyword, apiKey, pageCount]);

//   return (
//     <div>
//       <h2>Books:</h2>
//       <ul>
//         {books.map((book, index) => (
//           <li key={index}>{book.volumeInfo.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// GeneralQuery.propTypes = {
//   keyword: PropTypes.string.isRequired,
//   apiKey: PropTypes.string.isRequired,
//   pageCount: PropTypes.string.isRequired,
//   query: PropTypes.string.isRequired,
// };

// export default GeneralQuery;

// *****************************
// const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
// const key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

// async function GeneralQuery(params) {
//   const urlParams = new URLSearchParams();

//   // Append parameters conditionally
//   if (params.categories) {
//     urlParams.append("q", `subject:${params.categories}`);
//   }

//   if (params.keywords) {
//     urlParams.append("q", params.keywords);
//   }

//   if (params.pageCount) {
//     urlParams.append("pageCount", params.pageCount);
//   }

//   if (params.authors) {
//     urlParams.append("q", `inauthor:${params.authors}`);
//   }

//   if (params.language) {
//     urlParams.append("langRestrict", params.language);
//   }

//   if (params.title) {
//     urlParams.append("q", `intitle:${params.title}`);
//   }

//   // Constructing the final URL
//   urlParams.append("key", key);

//   const url = `${baseUrl}?${urlParams.toString()}`;

//   console.log("Final URL:", url);

//   // Example fetch request
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("API Response:", data);
//       // Process the data here
//     })
//     .catch((error) => console.error("Error:", error));
// }

// export default GeneralQuery;
