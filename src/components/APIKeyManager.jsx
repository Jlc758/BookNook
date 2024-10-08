import { useState, useEffect } from "react";
import { TextInput, Button, Modal, Text, Space } from "@mantine/core";

export const APIButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} color="var(--mantine-color-gray-6)">
      API Key
    </Button>
  );
};

export const APIKeyManager = ({ setAppApiKey, initialIsOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedApiKey = localStorage.getItem("openaiAPIKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setAppApiKey(savedApiKey);
    }
  }, [setAppApiKey]);

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("openaiAPIKey", apiKey);
    setAppApiKey(apiKey);
    setIsOpen(false);
  };

  return (
    <>
      <APIButton onClick={() => setIsOpen(true)} />

      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        title="Manage API Key"
      >
        <form onSubmit={handleApiKeySubmit}>
          <Text size="sm" mb="xs">
            If you would like to utilize the AI-integrated search feature
            (Summon by Sentences), you will need an OpenAI API Key to proceed.
            <Space h="md" />
            If you do not have an OpenAI API Key, click{" "}
            <a href="https://platform.openai.com/api-keys">here</a> to set one
            up, or you can use the Summon by Selection tab to search without
            AI-integration.
            <Space h="lg" />
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
    </>
  );
};

export default APIKeyManager;
