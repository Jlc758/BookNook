import { useState, useCallback } from "react";
import useShelf from "./useShelf";
import useTopTen from "./useTopTen";
import StarRating from "../components/StarRating";
import Sparkle from "react-sparkle";

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalType, setModalType] = useState("");
  const [selectedShelves, setSelectedShelves] = useState({});
  const [selectedRating, setSelectedRating] = useState(0);

  const { addToShelf, updateBookInShelf, updateBookRating, getBookRating } =
    useShelf();
  const { swapTopTenBook } = useTopTen();

  const openModal = useCallback(
    (book, type) => {
      setSelectedBook(book);
      setModalType(type);
      setSelectedShelves({});
      setSelectedRating(getBookRating(book.id));
      setModalOpen(true);
    },
    [getBookRating]
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedBook(null);
    setModalType("");
    setSelectedShelves({});
    setSelectedRating(0);
  }, []);

  const handleRatingChange = useCallback((book, newRating) => {
    setSelectedRating(newRating);
  }, []);

  const toggleShelfSelection = useCallback((shelfName) => {
    setSelectedShelves((prevShelves) => ({
      ...prevShelves,
      [shelfName]: !prevShelves[shelfName],
    }));
  }, []);

  const formatShelfName = useCallback((shelfName) => {
    const unchangedShelves = ["TBR", "DNF"];
    if (unchangedShelves.includes(shelfName)) {
      return shelfName;
    }
    return shelfName.replace(/([A-Z])/g, " $1").trim();
  }, []);

  const handleModalConfirm = useCallback(
    (book, shelfName, bookToRemove) => {
      switch (modalType) {
        case "selectShelf":
        case "previouslyRead":
          addToShelf(book, shelfName);
          addToShelf(book, "AllBooks");
          if (selectedRating > 0) {
            updateBookRating(book.id, selectedRating);
          }
          break;
        case "CurrentRead":
          addToShelf(book, "CurrentRead");
          addToShelf(book, "AllBooks");
          break;
        case "topTen":
          if (bookToRemove) {
            swapTopTenBook(bookToRemove, book);
          } else {
            console.warn(
              "Attempted to swap Top Ten book without specifying a book to remove"
            );
          }
          break;
        default:
          console.warn(`Unhandled modal type: ${modalType}`);
      }

      if (selectedRating > 0) {
        updateBookInShelf(book, shelfName, { rating: selectedRating });
      }
      closeModal();
    },
    [
      modalType,
      addToShelf,
      swapTopTenBook,
      updateBookInShelf,
      updateBookRating,
      closeModal,
      selectedRating,
    ]
  );

  const renderModalContent = useCallback(
    (addToShelf, removeFromShelf, shelves, handleModalConfirm) => {
      if (!selectedBook) return null;

      const bookCover =
        selectedBook.volumeInfo?.imageLinks?.thumbnail ||
        "placeholder_image_url";
      const bookTitle = selectedBook.volumeInfo?.title;
      const bookDescription =
        selectedBook.volumeInfo?.description || "No description available.";

      const modalStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        textAlign: "center",
        zIndex: "1000",
        maxHeight: "70vh",
      };

      const coverStyle = {
        width: "100%",
        maxWidth: "100px",
        objectFit: "cover",
      };

      const buttonStyle = (shelfName) => ({
        border: "none",
        borderBottom: `2px solid ${
          selectedShelves[shelfName]
            ? "var(--mantine-color-blue-1)"
            : "var(--mantine-color-rose-1)"
        }`,
        backgroundColor: selectedShelves[shelfName]
          ? "var(--mantine-color-rose-1)"
          : "transparent",
        fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
        padding: "0 clamp(5px, 1vw, 10px)",
        margin: "0 2px 2rem 2px",
        cursor: "pointer",
      });

      const subheaderStyle = {
        fontSize: 12,
        fontStyle: "italic",
      };

      const confirmButtonStyle = {
        backgroundColor: "var(--mantine-color-rose-1)",
        color: "black",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
      };

      const renderBookInfo = () => (
        <div>
          <img src={bookCover} alt={bookTitle} style={coverStyle} />
          <h3>{bookTitle}</h3>
        </div>
      );

      const handleConfirm = () => {
        const selectedShelfNames = Object.keys(selectedShelves).filter(
          (shelf) => selectedShelves[shelf]
        );

        if (modalType === "previouslyRead") {
          // Always add to Completed shelf for previouslyRead
          handleModalConfirm(selectedBook, "Completed", null, selectedRating);
          // Add to any additional selected shelves
          selectedShelfNames.forEach((shelfName) => {
            if (shelfName !== "Completed") {
              handleModalConfirm(selectedBook, shelfName, null, selectedRating);
            }
          });
        } else if (
          modalType === "selectShelf" &&
          selectedShelfNames.length > 0
        ) {
          selectedShelfNames.forEach((shelfName) => {
            handleModalConfirm(selectedBook, shelfName, null);
          });
        } else if (modalType === "CurrentRead") {
          handleModalConfirm(selectedBook, "CurrentRead", null);
        } else {
          console.warn("No shelf selected");
          return; // Don't close the modal if no shelf is selected
        }

        closeModal();
      };
      switch (modalType) {
        case "selectShelf":
          return (
            <div style={modalStyle}>
              {renderBookInfo()}
              <p style={subheaderStyle}>
                Selections are automatically added to both their chosen shelf
                and &quot;All Books&quot;
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {Object.keys(shelves)
                  .filter((shelfName) => shelfName !== "AllBooks")
                  .map((shelfName) => (
                    <button
                      key={shelfName}
                      style={buttonStyle(shelfName)}
                      onClick={() => toggleShelfSelection(shelfName)}
                    >
                      {formatShelfName(shelfName)}
                    </button>
                  ))}
              </div>
              <button
                style={confirmButtonStyle}
                onClick={handleConfirm}
                disabled={Object.values(selectedShelves).every(
                  (value) => !value
                )}
              >
                Confirm
              </button>
            </div>
          );
        case "previouslyRead":
          return (
            <div style={modalStyle}>
              {renderBookInfo()}
              <StarRating
                book={selectedBook}
                onRatingSelect={handleRatingChange}
                initialRating={selectedRating || getBookRating(selectedBook.id)}
              />
              <p style={subheaderStyle}>
                Have you already read this book? Provide a rating and save it to
                your preferred shelf!
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {Object.keys(shelves).map((shelfName) => (
                  <button
                    key={shelfName}
                    style={buttonStyle(shelfName)}
                    onClick={() => toggleShelfSelection(shelfName)}
                  >
                    {formatShelfName(shelfName)}
                  </button>
                ))}
              </div>
              <button style={confirmButtonStyle} onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          );
        case "CurrentRead":
          return (
            <div style={modalStyle}>
              {renderBookInfo()}
              <p style={subheaderStyle}>
                Are you reading this book? How exciting! Note your progress on
                the homepage and set a rating when you&apos;re done!
              </p>
              <button style={confirmButtonStyle} onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          );
        case "topTen":
          return (
            <div style={modalStyle}>
              {renderBookInfo()}
              <p style={subheaderStyle}>
                <div style={{ position: "relative" }}>
                  <Sparkle
                    count={7}
                    flickerSpeed={"slowest"}
                    fadeOutSpeed={20}
                    flicker={false}
                  />
                  Your Top Ten list is full. To add this book, you&apos;ll need
                  to remove one from your current list.
                </div>
              </p>

              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                {shelves.TopTen.map((topTenBook, index) => (
                  <div
                    key={topTenBook.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <span>
                      {index + 1}. {topTenBook.volumeInfo.title}
                    </span>
                    <button
                      style={{
                        ...confirmButtonStyle,
                        padding: "5px 10px",
                        fontSize: "0.8em",
                      }}
                      onClick={() =>
                        handleModalConfirm(selectedBook, "TopTen", topTenBook)
                      }
                    >
                      Swap
                    </button>
                  </div>
                ))}
              </div>
              <button style={confirmButtonStyle} onClick={closeModal}>
                Cancel
              </button>
            </div>
          );
        case "bookDescription":
          return (
            <div style={modalStyle}>
              {renderBookInfo()}
              <div
                style={{
                  maxWidth: "500px",
                  maxHeight: "300px",
                  overflowY: "auto",
                  marginTop: "20px",
                }}
              >
                <p>{bookDescription}</p>
              </div>
            </div>
          );
        default:
          return null;
      }
    },
    [
      selectedBook,
      modalType,
      selectedShelves,
      selectedRating,
      handleRatingChange,
      formatShelfName,
      toggleShelfSelection,
      closeModal,
      getBookRating,
    ]
  );

  return {
    modalOpen,
    selectedBook,
    modalType,
    selectedShelves,
    openModal,
    closeModal,
    handleModalConfirm,
    renderModalContent,
    selectedRating,
    handleRatingChange,
    toggleShelfSelection,
    formatShelfName,
  };
};

export default useModal;
