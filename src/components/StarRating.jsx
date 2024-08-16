import { Rating } from "@mantine/core";
import { useState } from "react";

function StarRating() {
  const [value, setValue] = useState(0);

  return <Rating value={value} onChange={setValue} fractions={2} />;
}

export default StarRating;

// currently allows user to select number of stars with half-star options
