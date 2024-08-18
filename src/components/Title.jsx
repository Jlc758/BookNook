import { Text } from "@mantine/core";
import propTypes from "prop-types";

const Title = ({ children }) => {
  return (
    <Text
      size="lg"
      variant="gradient"
      gradient={{ from: "grey", to: "white", deg: 200 }}
      ta="center"
      style={{
        width: "100%", // Ensure the text takes full width of its container
        maxWidth: "180px", // Match this to your image width
        minHeight: "3em", // Provide space for up to 2 lines of text
        marginTop: "0.5em", // Add some space between the image and the title
        lineHeight: "1",
      }}
    >
      {children}
    </Text>
  );
};

Title.propTypes = {
  children: propTypes.string.isRequired,
};

export const MainTitle = ({ children }) => {
  return (
    <Text
      size="30px"
      variant="gradient"
      fw={600}
      gradient={{ from: "pink", to: "yellow", deg: 200 }}
      ta={"center"}
    >
      {children}
    </Text>
  );
};

MainTitle.propTypes = {
  children: propTypes.string.isRequired,
};

export default Title;
