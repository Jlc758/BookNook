import { useState } from "react";
import StarRating from "../components/StarRating";

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalType, setModalType] = useState("");
  const [selectedShelves, setSelectedShelves] = useState({});

  const openModal = (book, type) => {
    setSelectedBook(book);
    setModalType(type);
    setSelectedShelves({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
    setModalType("");
    setSelectedShelves({});
  };

  const formatShelfName = (shelfName) => {
    const unchangedShelves = ["TBR", "DNF"];
    if (unchangedShelves.includes(shelfName)) {
      return shelfName;
    }
    return shelfName.replace(/([A-Z])/g, " $1").trim();
  };

  const toggleShelfSelection = (shelfName) => {
    setSelectedShelves((prevShelves) => ({
      ...prevShelves,
      [shelfName]: !prevShelves[shelfName],
    }));
  };

  const renderModalContent = (
    addToShelf,
    shelves,
    placeholder,
    handleModalAction
  ) => {
    if (!selectedBook) return null;

    const bookCover =
      selectedBook.volumeInfo?.imageLinks?.thumbnail || placeholder;
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
    };

    const coverStyle = {
      width: "100%",
      maxWidth: "120px",
      objectFit: "cover",
      marginBottom: "10px",
    };

    const buttonStyle = (shelfName) => ({
      border: "none",
      borderBottom: `2px solid ${
        selectedShelves[shelfName]
          ? "var(--mantine-color-rose-6)"
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
      Object.keys(selectedShelves).forEach((shelfName) => {
        if (selectedShelves[shelfName]) {
          addToShelf(selectedBook, shelfName);
          addToShelf(selectedBook, "AllBooks");
        }
      });

      handleModalAction(
        selectedBook,
        modalType === "selectShelf"
          ? "onShelf"
          : modalType === "previouslyRead"
          ? "prevRead"
          : "currentRead"
      );

      closeModal();
    };

    switch (modalType) {
      case "selectShelf":
      case "previouslyRead":
      case "reading":
        return (
          <div style={modalStyle}>
            {renderBookInfo()}
            {modalType !== "selectShelf" && <StarRating />}
            <p style={subheaderStyle}>
              {modalType === "selectShelf"
                ? 'Selections are automatically added to both their chosen shelf and "All Books".'
                : modalType === "previouslyRead"
                ? "Have you already read this book? Provide a rating and optional review, and save it to your preferred shelf!"
                : "Are you reading this book? How exciting! Note your progress and set a rating and optional review when you're done!"}
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
            <button
              style={confirmButtonStyle}
              onClick={handleConfirm}
              disabled={Object.values(selectedShelves).every((v) => !v)}
            >
              Confirm
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
  };

  return {
    modalOpen,
    selectedBook,
    modalType,
    openModal,
    closeModal,
    renderModalContent,
  };
};

export default useModal;
