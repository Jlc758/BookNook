import OpenAI from "openai";
import { useCallback, useState, useEffect } from "react";

function useOpenAI(userInput) {
  const [keywords, setKeywords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKeywords = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You are an expert at extracting key words from natural language input by users and converting it to valid JSON format. Key words will be used to search for books in the Google Books API database.
            Always prioritize placing genre or category-related terms (like "true crime", "science fiction", etc.) in the 'mainCategory' field. Do not duplicate these terms in the 'keywords' field.
            Only use the 'keywords' field for additional search terms that are not the main category or genre.
            Example:  Prompt -- Looking for a true crime novel with a female detective less than 500 pages in length set in the 1930s. Response -- {
                    'title': null,
                    'author': null,
                    'mainCategory': 'true crime',
                    'pageCount': 500,
                    'keywords': '1930s', 'female+detective',
                  }`,
          },
          {
            role: "user",
            content: `Prompt -- ${userInput}`,
          },
        ],
        temperature: 0,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      try {
        const responseObject = JSON.parse(response.choices[0].message.content);
        setKeywords(responseObject);
      } catch (parseError) {
        throw new Error("Failed to parse API response");
      }
    } catch (error) {
      console.log("Fetch error: ", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [userInput]);

  useEffect(() => {
    let ignore = false;

    if (userInput) {
      fetchKeywords().then(() => {
        if (!ignore) setLoading(false);
      });
    }

    return () => {
      ignore = true;
    };
  }, [userInput, fetchKeywords]);

  return { keywords, loading, error };
}

export default useOpenAI;
