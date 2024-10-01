import { useState, useEffect } from "react";
import { TextInput, Button, Modal, Text } from "@mantine/core";

export const APIButton = ({ setAppApiKey }) => {
  const [apiKey, setApiKey] = useState("");
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("openaiAPIKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      if (typeof setAppApiKey === "function") {
        setAppApiKey(savedApiKey);
      }
    }
  }, []);

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("openaiAPIKey", apiKey);
    if (typeof setAppApiKey === "function") {
      setAppApiKey(apiKey);
      console.log("openAI", apiKey);
    }
    setIsApiKeyModalOpen(false);
  };

  return (
    <>
      <div>
        <Button
          onClick={() => {
            setIsApiKeyModalOpen(true);
          }}
          color="var(--mantine-color-gray-6)"
        >
          API Key
        </Button>
      </div>

      <Modal
        opened={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        title="Manage API Key"
      >
        <form onSubmit={handleApiKeySubmit}>
          <TextInput
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API Key"
            required
          />
          <Button
            type="submit"
            fullWidth
            mt="sm"
            onClick={() => setIsApiKeyModalOpen(false)}
          >
            Save API Key
          </Button>
        </form>
      </Modal>
    </>
  );
};

const APIKeyManager = ({ isOpen, onClose, onSave }) => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedApiKey = localStorage.getItem("openaiAPIKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("openaiAPIKey", apiKey);
    onSave(apiKey);
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Manage API Key">
      <form onSubmit={handleSubmit}>
        <Text size="sm" mb="xs">
          Enter your OpenAI API Key:
        </Text>
        <TextInput
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API Key"
          required
        />
        <Button type="submit" fullWidth mt="sm">
          Save API Key
        </Button>
      </form>
    </Modal>
  );
};

export default APIKeyManager;
