import { RingProgress, SimpleGrid, Container } from "@mantine/core";

import { PieChart, Pie } from "recharts";

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

  const grid = (
    <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  );

  return (
    <>
      <h1>Landing Page</h1>
      <div>{ring}</div>
      <div>{pieChart}</div>
      <Container>{grid}</Container>
    </>
  );
}

export default LandingPage;
