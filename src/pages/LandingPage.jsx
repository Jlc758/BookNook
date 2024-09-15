import { useNavigate } from "react-router-dom";
import { Title, Progress, TextInput } from "@mantine/core";
import Cover from "../images/BookCover.jpg";
import useSearch from "../hooks/useSearch";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
//   { name: "Group E", value: 278 },
//   { name: "Group F", value: 189 },
// ];

function LandingPage() {
  const { searchText, setSearchText } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const ProgressBar = () => {
    return <Progress color="gray" radius="xl" size="lg" value={30} />;
  };

  const CurrentRead = (
    <div>
      <div>
        <img src={Cover} style={{ height: "20rem", width: "auto" }} />
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
    <>
      <div className="MainContent">
        <div className="main">
          <div className="first">
            <div className="CurrentRead">{CurrentRead}</div>
            <div className="rightArea">
              <div className="NextThree">
                <img src={Cover} />
              </div>
              <div className="NextThree">
                <img src={Cover} />
              </div>
              <div className="NextThree">
                <img src={Cover} />
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
          <div className="footer" />
        </div>
      </div>
    </>
  );
}

export default LandingPage;

//   const ring = (
//     <RingProgress
//       size={120}
//       thickness={22}
//       roundCaps={true}
//       sections={[
//         { value: 40, color: "cyan" },
//         { value: 15, color: "orange" },
//         { value: 15, color: "grape" },
//       ]}
//     />
//   );

//   const pieChart = (
//     <PieChart width={400} height={400}>
//       <Pie
//         dataKey="value"
//         startAngle={180}
//         endAngle={0}
//         data={data}
//         cx={200}
//         cy={200}
//         outerRadius={80}
//         fill="#8884d8"
//         label
//       />
//     </PieChart>
//   );
