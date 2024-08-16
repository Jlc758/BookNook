import { Text } from "@mantine/core";

const Title = () => {
  return (
    <Text
      size="lg"
      variant="gradient"
      gradient={{ from: "grey", to: "white", deg: 200 }}
      ta="center"
    >
      Gradient Text
    </Text>
  );
};

export default Title;
