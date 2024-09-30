# BookNook

BookNook is a web application for book enthusiasts to discover, track, and manage their reading experiences. This app allows users to search for books, organize them into shelves, and keep track of their reading progress.

## Features

- Natural language book search
- Criteria-based book search
- Personalized bookshelves (CurrentRead, AllBooks, TopTen, TBR, Loved, Completed, DNF)
- Book rating system
- Reading progress tracker
- Dark/Light mode toggle

## Technologies Used

- React
- Mantine UI
- React Router
- OpenAI API (for natural language processing)
- Google Books API

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `src/components/`: React components
- `src/context/`: Context providers for state management
- `src/css/`: CSS modules and global styles
- `src/hooks/`: Custom React hooks
- `src/images/`: Image assets
- `src/pages/`: Page components

## Main Components

- `App.jsx`: Main application component
- `Navigation.jsx`: Navigation bar component
- `ResultsDisplay.jsx`: Displays search results and manages book actions
- `BookTabs.jsx`: Manages the display of different bookshelves
- `NatLangSearch.jsx`: Handles natural language search
- `SelectSearch.jsx`: Handles criteria-based search

## State Management

The application uses React Context for state management:

- `SearchContext`: Manages search-related state
- `ShelfContext`: Manages bookshelf-related state

## API Integration

- Google Books API: Used for fetching book information
- OpenAI API: Used for processing natural language search queries

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
