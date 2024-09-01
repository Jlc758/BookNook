import { RingProgress } from "@mantine/core";
import { MainTitle } from "../components/Title";
import { PieChart } from "recharts/es6/chart/PieChart";
import { Pie } from "recharts/es6/polar/Pie";
import KeenFlip from "../components/KeenFlip";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

function LandingPage() {
  const ring = (
    <RingProgress
      size={120}
      thickness={22}
      roundCaps={true}
      sections={[
        { value: 40, color: "cyan" },
        { value: 15, color: "orange" },
        { value: 15, color: "grape" },
      ]}
    />
  );

  const pieChart = (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      />
    </PieChart>
  );

  return (
    <>
      <div className="MainContent">
        <MainTitle>{"Welcome to yours BookNook"}</MainTitle>
        <div>{ring}</div>
        <div>{pieChart}</div>
        <div>
          <KeenFlip />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
