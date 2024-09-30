import { useEffect } from "react";
import { Modal, Button, Text } from "@mantine/core";
import { RxMagicWand } from "react-icons/rx";

const WelcomeModal = ({ opened, onClose }) => {
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (!hasVisited) {
      onClose(); // Only show modal when it is opened externally for the first time
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, [onClose]);

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
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID" // Replace with your video URL
          title="Welcome Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
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
