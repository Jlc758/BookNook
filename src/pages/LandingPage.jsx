import { useNavigate, useLocation } from "react-router-dom";
import { Title, TextInput, Checkbox, Group, Text } from "@mantine/core";
import Placeholder from "../components/Placeholder";
import useSearch from "../hooks/useSearch";
import { useEffect } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { FcKindle } from "react-icons/fc";
import { FaBook } from "react-icons/fa";
import { TbHeadphonesFilled } from "react-icons/tb";
import HeroPlaceholder from "../images/HeroPlaceholder.png";
import { useShelf } from "../hooks/useShelf";
import ProgressBar from "../components/ProgressBar";
import WelcomeModal from "../components/WelcomeModal";

const LandingPage = () => {
  const { searchText, setSearchText } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const { shelves } = useShelf(); // Use ShelfContext
  const CurrentReadBook = shelves.CurrentRead[0];

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
    if (!CurrentReadBook) {
      return (
        <div className="NoCurrentRead">
          <Placeholder className="CurrentReadPlaceholder" />
          <div className="currentReadTitle">
            <Title order={4} align="center">
              No book selected as your current read!
            </Title>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="currentReadCover">
          <div style={{ height: "15rem", width: "auto" }}>
            {CurrentReadBook.volumeInfo?.imageLinks?.thumbnail ? (
              <img
                src={CurrentReadBook.volumeInfo.imageLinks.thumbnail}
                alt={CurrentReadBook.volumeInfo.title}
                style={{ height: "100%", width: "auto", objectFit: "cover" }}
              />
            ) : (
              <Placeholder className="current-read-placeholder" />
            )}
          </div>
        </div>
        <div className="currentReadTitle" style={{ display: "flex" }}>
          <Title order={5}>
            {CurrentReadBook.volumeInfo?.title || "Unknown Title"}
          </Title>
        </div>
        <div className="currentReadFormatAndProgress">
          <div className="currentReadFormat">
            {ReadingFormatOptions(CurrentReadBook)}
          </div>
          <div className="currentReadProgress">
            <ProgressBar book={CurrentReadBook} />
          </div>
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

  const topTenBooks = shelves.TopTen.slice(0, 10).map((book, index) => (
    <div key={book.id || index} className="topTenBook">
      {book.volumeInfo?.imageLinks?.thumbnail ? (
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
          className="topTenBookCover"
        />
      ) : (
        <Placeholder className="topTenBookPlaceholder" />
      )}
      <Title order={6}>{book.volumeInfo?.title || "Unknown Title"}</Title>
    </div>
  ));

  return (
    <div className="MainContent">
      <WelcomeModal />

      <div className="main">
        <div className="hero">
          <img src={HeroPlaceholder} className="heroPlaceholder" />
        </div>
        <div className="first">
          <div className={CurrentReadBook ? "CurrentRead" : "NoCurrentRead"}>
            {CurrentRead}
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
              styles={() => ({
                root: { width: "100%" },
                wrapper: { width: "100%" },
                input: { width: "100%" },
              })}
            />
            <button onClick={handleClick} className="searchButton">
              <RiSearch2Line className="searchImg" />
            </button>
          </div>
          <div className="rightArea">
            <div className="topTenScroll">
              <Text size="lg" fs="italic" fw={500} ta="center">
                Coming up on your TBR...
              </Text>
              {shelves.TopTen.length > 0 ? (
                topTenBooks
              ) : (
                <div className="emptyTopTen">
                  <p>No books saved to your Top Ten TBR shelf yet!</p>
                  <p>
                    Make a search above, or check out the Disover page and find
                    your next adventure
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
