import OpenAI from "openai";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

function useOpenAI(userInput) {
  const [keywords, setKeywords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInput) return;

    const fetchKeywords = async () => {
      setLoading(true);
      setError(null);

      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      // Trope & shorthand definitions
      const shorthandMapping = {
        "w/w": "woman on woman",
        "m/m": "man on man",
        "m/f": "man and woman",
        "reverse harem": "reverse harem",
        "m/m/w": "reverse harem",
        harem: "harem",
        lgbtq: "LGBTQ",
        sapphic: "sapphic",
      };

      const tropeMapping = {
        "enemies to lovers": "enemies to lovers",
        "second chance": "second chance",
        "meet-cute": "meet-cute",
        "forced proximity": "forced proximity",
        "forbidden love": "forbidden love",
        "love triangle": "love triangle",
        "fake relationship": "fake relationship",
        "slow burn": "slow burn",
        "opposites attract": "opposites attract",
        "friends to lovers": "friends to lovers",
      };

      const expandInput = (input) => {
        let expandedInput = input;

        // Expand shorthand terms
        for (const shorthand in shorthandMapping) {
          const expandedTerm = shorthandMapping[shorthand];
          expandedInput = expandedInput.replace(
            new RegExp(`\\b${shorthand}\\b`, "gi"),
            expandedTerm
          );
        }

        // Expand tropes
        for (const trope in tropeMapping) {
          const expandedTrope = tropeMapping[trope];
          expandedInput = expandedInput.replace(
            new RegExp(`\\b${trope}\\b`, "gi"),
            expandedTrope
          );
        }

        return expandedInput;
      };

      const ResponseSchema = z.object({
        title: z.string().nullable(),
        author: z.string().nullable(),
        mainCategory: z.string().nullable(),
        pageCount: z.number().nullable(),
        keywords: z.array(z.string()).nullable(),
      });

      try {
        const completion = await openai.beta.chat.completions.parse({
          model: "gpt-4o-2024-08-06",
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
              content: `Prompt -- ${expandInput(userInput)}`,
            },
          ],
          temperature: 0,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          response_format: zodResponseFormat(ResponseSchema, "api-response"),
        });

        const responseMessage = completion.choices[0].message;

        if (responseMessage.parsed) {
          setKeywords(responseMessage.parsed);
        } else if (responseMessage.refusal) {
          console.log(
            "API refused to provide a response: ",
            responseMessage.refusal
          );
          setError("API refused to provide a response.");
        } else {
          console.log("Unexpected API response format: ", responseMessage);
          setError("Unexpected API response format.");
        }
      } catch (e) {
        if (e.constructor.name === "LengthFinishReasonError") {
          console.log("Too many tokens: ", e.message);
          // Retry with a higher max tokens if necessary
        } else {
          console.log("An error occurred: ", e.message);
          setError(e.message || "An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchKeywords();
  }, [userInput]);

  useEffect(() => {
    console.log("Keywords: ", keywords);
  }, [keywords]);

  return { keywords, loading, error };
}

export default useOpenAI;
