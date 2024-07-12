import { useEffect, useState } from "react";
import OpenAI from "openai";

const openAIAPIKey = import.meta.env.VITE_OPENAI_API_KEY;

function useOpenAI() {
  const [openai, setOpenAI] = useState(null);

  useEffect(() => {
    if (openAIAPIKey) {
      const openAIInstance = new OpenAI(openAIAPIKey);
      setOpenAI(openAIInstance);
    } else {
      console.error("OpenAI API key is not set");
    }
  }, []);
  return openai;
}

export default useOpenAI;
