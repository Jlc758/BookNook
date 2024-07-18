const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

async function GeneralQuery(params) {
  const urlParams = new URLSearchParams();

  // Append parameters conditionally
  if (params.categories) {
    urlParams.append("q", `subject:${params.categories}`);
  }

  if (params.keywords) {
    urlParams.append("q", params.keywords);
  }

  if (params.pageCount) {
    urlParams.append("pageCount", params.pageCount);
  }

  if (params.authors) {
    urlParams.append("q", `inauthor:${params.authors}`);
  }

  if (params.language) {
    urlParams.append("langRestrict", params.language);
  }

  if (params.title) {
    urlParams.append("q", `intitle:${params.title}`);
  }

  // Constructing the final URL
  urlParams.append("key", key);

  const url = `${baseUrl}?${urlParams.toString()}`;

  console.log("Final URL:", url);

  // Example fetch request
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data);
      // Process the data here
    })
    .catch((error) => console.error("Error:", error));
}

export default GeneralQuery;
