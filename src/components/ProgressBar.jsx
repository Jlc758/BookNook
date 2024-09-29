import React, { useState, useEffect } from "react";
import { Progress, TextInput, Text, Container, Group } from "@mantine/core";

export default function ProgressBar({ book }) {
  const [current, setCurrent] = useState("");
  const [max, setMax] = useState(book?.volumeInfo?.pageCount || 100);

  useEffect(() => {
    setMax(book?.volumeInfo?.pageCount || 100);
    // Load the current page from local storage when the component mounts or the book changes
    const storedCurrent = localStorage.getItem(`book-${book?.id}-current`);
    if (storedCurrent) {
      setCurrent(storedCurrent);
    }
  }, [book]);

  useEffect(() => {
    // Save the current page to local storage whenever it changes
    if (current !== "") {
      localStorage.setItem(`book-${book?.id}-current`, current);
    }
  }, [current, book]);

  const handleCurrentChange = (value) => {
    if (value === "") {
      setCurrent("");
    } else {
      const numValue = Number(value);
      setCurrent(Math.max(0, Math.min(numValue, max)).toString());
    }
  };

  const currentNumber = current === "" ? 0 : Number(current);
  const percentage = max > 0 ? Math.round((currentNumber / max) * 100) : 0;

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
          placeholder="0"
        />
        <TextInput label="Total Pages" type="number" value={max} readOnly />
      </Group>

      <Text align="center" aria-live="polite">
        Progress: {current || 0} out of {max} ({percentage}%)
      </Text>
    </Container>
  );
}
