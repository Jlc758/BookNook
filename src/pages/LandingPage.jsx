import { RingProgress, Title, Progress } from "@mantine/core";
// import { MainTitle } from "../components/Title";
import { PieChart } from "recharts/es6/chart/PieChart";
import { Pie } from "recharts/es6/polar/Pie";
// import KeenFlip from "../components/KeenFlip";
import Cover from "../images/BookCover.jpg";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

function LandingPage() {
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
          <div className="second" />
          <div className="footer" />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
