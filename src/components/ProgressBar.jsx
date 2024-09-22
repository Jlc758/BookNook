import { useState } from "react";
import { Progress, TextInput, Text, Container, Group } from "@mantine/core";

export default function ProgressBar(currentReadBook) {
  const [current, setCurrent] = useState(50);
  const [max, setMax] = useState(100);

  const handleCurrentChange = (value) => {
    const numValue = Number(value);
    setCurrent(Math.max(0, Math.min(numValue, max)));
  };

  const handleMaxChange = (value) => {
    const numValue = Math.max(1, Number(value));
    setMax(numValue);
    if (current > numValue) {
      setCurrent(numValue);
    }
  };

  const percentage = Math.round((current / max) * 100);

  return (
    <Container spacing="md" style={{ maxWidth: 400, margin: "0 auto" }}>
      <Progress
        value={percentage}
        label={`${percentage}%`}
        size="xl"
        radius="xl"
      />
      <Group grow>
        <TextInput
          label="Current Page"
          type="number"
          value={current}
          onChange={(event) => handleCurrentChange(event.currentTarget.value)}
          min={0}
          max={max}
        />
        <TextInput
          label="Total Pages"
          type="number"
          value={currentReadBook.volumeInfo?.title}
          onChange={(event) => handleMaxChange(event.currentTarget.value)}
          min={1}
        />
      </Group>

      <Text align="center" aria-live="polite">
        Progress: {current} out of {max} ({percentage}%)
      </Text>
    </Container>
  );
}
