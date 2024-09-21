import { useNavigate, useLocation } from "react-router-dom";
import { Title, Progress, TextInput } from "@mantine/core";
import Placeholder from "../components/Placeholder";
import useSearch from "../hooks/useSearch";
import { useEffect, useContext } from "react";
import { RiSearch2Line } from "react-icons/ri";
import HeroPlaceholder from "../images/HeroPlaceholder.png";
import { ShelfContext } from "../context/ShelfContext";

function LandingPage() {
  const { searchText, setSearchText } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const { shelves } = useContext(ShelfContext); // Use ShelfContext

  const ProgressBar = () => {
    return <Progress color="gray" radius="xl" size="lg" value={30} />;
  };

  const CurrentRead = (() => {
    const currentReadBook = shelves.CurrentRead[0];

    if (!currentReadBook) {
      return (
        <div>
          <div style={{ height: "20rem", width: "auto" }}>
            <Placeholder className="currentReadPlaceholder" />
          </div>
          <Title>No book chosen</Title>
        </div>
      );
    }

    return (
      <div>
        <div style={{ height: "20rem", width: "auto" }}>
          {currentReadBook.volumeInfo?.imageLinks?.thumbnail ? (
            <img
              src={currentReadBook.volumeInfo.imageLinks.thumbnail}
              alt={currentReadBook.volumeInfo.title}
              style={{ height: "100%", width: "auto", objectFit: "cover" }}
            />
          ) : (
            <Placeholder className="current-read-placeholder" />
          )}
        </div>
        <Title>{currentReadBook.volumeInfo?.title || "Unknown Title"}</Title>
        <div>{ProgressBar()}</div>
        <div>Rating</div>
        <div>Format (Book, AudioBook, eBook)</div>
      </div>
    );
  })();

  useEffect(() => {
    setSearchText("");
  }, [location, setSearchText]);

  const handleClick = () => {
    navigate("/search");
  };

  return (
    <div className="MainContent">
      <div className="main">
        <div className="hero">
          <img src={HeroPlaceholder} className="heroPlaceholder" />
        </div>
        <div className="first">
          <div className="CurrentRead">{CurrentRead}</div>
          <div className="rightArea">
            <div className="NextThree">
              <Placeholder className="next-read-placeholder" />
            </div>
            <div className="NextThree">
              <Placeholder className="next-read-placeholder" />
            </div>
            <div className="NextThree">
              <Placeholder className="next-read-placeholder" />
            </div>
          </div>
        </div>
        <div className="second">
          <div className="landingSearch">
            <TextInput
              size="sm"
              radius="lg"
              value={searchText}
              placeholder="What's next?"
              onChange={(event) => setSearchText(event.currentTarget.value)}
            />
            <button onClick={handleClick} className="searchButton">
              <RiSearch2Line />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
