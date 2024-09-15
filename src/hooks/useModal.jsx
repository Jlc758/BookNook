import { useState } from "react";

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalType, setModalType] = useState("");

  const openModal = (book, type) => {
    setSelectedBook(book);
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
    setModalType("");
  };

  const formatShelfName = (shelfName) => {
    const unchangedShelves = ["TBR", "DNF"];

    if (unchangedShelves.includes(shelfName)) {
      return shelfName;
    }

    return shelfName.replace(/([A-Z])/g, " $1").trim();
  };

  const renderModalContent = (addToShelf, shelves, placeholder) => {
    if (!selectedBook) return null;

    const bookCover =
      selectedBook.volumeInfo?.imageLinks?.thumbnail || placeholder;
    const bookTitle = selectedBook.volumeInfo?.title;

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

    const buttonStyle = {
      border: "none",
      borderBottom: "2px solid var(--mantine-color-rose-1)",
      backgroundColor: "transparent",
      fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
      padding: "0 clamp(5px, 1vw, 10px)",
      margin: "0 2px 2rem 2px",
    };

    const subheaderStyle = {
      fontSize: 12,
      fontStyle: "italic",
    };

    const renderBookInfo = () => (
      <div>
        <img src={bookCover} alt={bookTitle} style={coverStyle} />
        <h3>{bookTitle}</h3>
      </div>
    );

    switch (modalType) {
      case "tbr":
        return (
          <div style={modalStyle}>
            {renderBookInfo()}
            <p>Do you want to add this book to your TBR list?</p>
            <button
              style={buttonStyle}
              onClick={() => {
                addToShelf(selectedBook, "TBR");
                closeModal();
              }}
            >
              Add to TBR
            </button>
          </div>
        );
      case "selectShelf":
        return (
          <div style={modalStyle}>
            {renderBookInfo()}
            <p style={subheaderStyle}>
              Selections are automatically added to both their chosen shelf and
              &quot;All Books&quot;.
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
                  style={buttonStyle}
                  onClick={() => {
                    addToShelf(selectedBook, shelfName);
                    closeModal();
                  }}
                >
                  {formatShelfName(shelfName)}
                </button>
              ))}
            </div>
          </div>
        );
      case "previouslyRead":
        return (
          <div style={modalStyle}>
            {renderBookInfo()}
            <p>Add a review or select a shelf for this book:</p>
            {/* Add review form and shelf selection here */}
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
