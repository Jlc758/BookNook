import { Modal, Button, Text } from "@mantine/core";
import { RxMagicWand } from "react-icons/rx";

const LoomVideo = () => {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "62.7172195892575%",
        height: 0,
      }}
    >
      <iframe
        src="https://www.loom.com/embed/2410175b04db4de1b7bbb5dac7e0c316?sid=36f6a262-2267-4fed-baa7-198b3d8073e1"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

const WelcomeModal = ({ opened, onClose }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      centered
      styles={(theme) => ({
        modal: {
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
        body: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing.md,
        },
      })}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          aspectRatio: "16 / 9",
          marginBottom: "1rem",
        }}
      >
        <LoomVideo />
      </div>
      <Text align="center" mb="md">
        Welcome to BookNook - a reading tracking app! This video will give you a
        quick tour of the features.
      </Text>
      <Button onClick={onClose} fullWidth>
        Proceed <RxMagicWand style={{ height: "20px" }} />
      </Button>
    </Modal>
  );
};

export default WelcomeModal;
