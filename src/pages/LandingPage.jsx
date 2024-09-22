import { useNavigate, useLocation } from "react-router-dom";
import { Title, TextInput, Checkbox, Group } from "@mantine/core";
import Placeholder from "../components/Placeholder";
import useSearch from "../hooks/useSearch";
import { useEffect, useContext } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { FcKindle } from "react-icons/fc";
import { FaBook } from "react-icons/fa";
import { TbHeadphonesFilled } from "react-icons/tb";
import HeroPlaceholder from "../images/HeroPlaceholder.png";
import { ShelfContext } from "../context/ShelfContext";
import ProgressBar from "../components/ProgressBar";

const LandingPage = () => {
  const { searchText, setSearchText } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const { shelves } = useContext(ShelfContext); // Use ShelfContext

  const ReadingFormatOptions = () => {
    return (
      <Checkbox.Group>
        <Group mt="xs">
          <Checkbox value="book" label="book" icon={FaBook} />
          <Checkbox
            value="audiobook"
            label="audiobook"
            icon={TbHeadphonesFilled}
          />
          <Checkbox value="ebook" label="ebook" icon={FcKindle} />
        </Group>
      </Checkbox.Group>
    );
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
      <>
        <div>
          <div style={{ height: "15rem", width: "auto" }}>
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
          <div>
            <ProgressBar />
          </div>
        </div>
        <div>
          <Title order={5}>
            {currentReadBook.volumeInfo?.title || "Unknown Title"}
          </Title>
          <div>{ReadingFormatOptions(currentReadBook)}</div>
        </div>
      </>
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
          <div className="rightArea">
            <Placeholder className="NextThree" />

            <Placeholder className="NextThree" />

            <Placeholder className="NextThree" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
