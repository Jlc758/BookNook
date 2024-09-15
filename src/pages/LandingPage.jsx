import { useNavigate, useLocation } from "react-router-dom";
import { Title, Progress, TextInput } from "@mantine/core";
import Placeholder from "../components/Placeholder";
import useSearch from "../hooks/useSearch";
import { useEffect } from "react";
import { RiSearch2Line } from "react-icons/ri";
import HeroPlaceholder from "../images/HeroPlaceholder.png";

function LandingPage() {
  const { searchText, setSearchText } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const ProgressBar = () => {
    return <Progress color="gray" radius="xl" size="lg" value={30} />;
  };

  const CurrentRead = (
    <div>
      <div style={{ height: "20rem", width: "auto" }}>
        <Placeholder className="current-read-placeholder" />
      </div>
      <Title>Title</Title>
      <div>{ProgressBar()}</div>
      <div>Rating</div>
      <div>Format (Book, AudioBook, eBook)</div>
    </div>
  );

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
