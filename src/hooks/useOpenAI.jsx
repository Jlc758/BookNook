import OpenAI from "openai";
import { useState, useEffect } from "react";
import {
  extendedBookSearchShorthand,
  romanceTropeOptions,
  trueCrimeTropeOptions,
  thrillerTropeOptions,
  sciFiTropeOptions,
  fantasyTropeOptions,
  genres,
} from "../context/searchCriteria";

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

      const expandInput = (input) => {
        let expandedInput = input;

        // Expand shorthand terms
        extendedBookSearchShorthand.forEach(({ value, label }) => {
          expandedInput = expandedInput.replace(
            new RegExp(`\\b${value}\\b`, "gi"),
            label
          );
        });

        // Expand tropes
        const allTropes = [
          ...romanceTropeOptions,
          ...trueCrimeTropeOptions,
          ...thrillerTropeOptions,
          ...sciFiTropeOptions,
          ...fantasyTropeOptions,
        ];

        allTropes.forEach(({ value, label }) => {
          expandedInput = expandedInput.replace(
            new RegExp(`\\b${value}\\b`, "gi"),
            label
          );
        });

        // Expand genres
        genres.forEach(({ value, label }) => {
          expandedInput = expandedInput.replace(
            new RegExp(`\\b${value}\\b`, "gi"),
            label
          );
        });

        return expandedInput;
      };

      const ResponseSchema = {
        type: "json_schema",
        json_schema: {
          name: "book_metadata",
          strict: true,
          schema: {
            type: "object",
            properties: {
              keywords: {
                type: "array",
                items: {
                  type: "string",
                },
                description:
                  "List of common words found in the description of a book. If value cannot be determined, return empty string",
              },
              mainCategory: {
                type: "string",
                enum: genres.map((genre) => genre.label),
                description:
                  "Main category or genre of the book. If a common category is not requested, return an empty string",
              },
              title: {
                type: "string",
                items: {
                  type: "string",
                },
                description:
                  "If value cannot be determined, return empty string",
              },
            },

            required: ["keywords", "mainCategory", "title"],
            additionalProperties: false,
          },
        },
      };

      const aiPromptExamples = {
        examples: [
          {
            role: "user",
            content: "throne of glass",
          },

          {
            role: "assistant",
            content: `{
                    'title': "throne of glass",
                    'author': null,
                    'mainCategory': null,
                    'pageCount': null,
                    'keywords': null,
                  }`,
          },
          {
            role: "user",
            content:
              "looking for a true crime novel with a female detective with less than 300 pages",
          },

          {
            role: "assistant",
            content: `{
                    'title': null,
                    'author': null,
                    'mainCategory': "true crime",
                    'pageCount': "300",
                    'keywords': "female", "detective",
                  }`,
          },
          {
            role: "user",
            content: "dahmer",
          },

          {
            role: "assistant",
            content: `{
                    'title': null,
                    'author': null,
                    'mainCategory': null,
                    'pageCount': null,
                    'keywords': "dahmer",
                  }`,
          },
        ],
      };

      const createPromptWithExamples = (userInput) => {
        return [
          {
            role: "system",
            content: `You are an expert at extracting key words from natural language input by users and converting it to valid JSON format. Key words will be used to search for books in the Google Books API database.
            Always prioritize placing genre or category-related terms (like "true crime", "science fiction", etc.) in the 'mainCategory' field. Do not duplicate these terms in the 'keywords' field.
            Only use the 'keywords' field for additional search terms that are not the main category or genre. Do not link any fields with prior search criteria.  Leave any non-explicit terms out results.
            For page count, interpret phrases as follows:
            - "less than X pages" as {max: X, min: null}
            - "more than X pages" as {min: X, max: null}
            - "around X pages" as {min: X - 50, max: X + 50}
            - exact page counts as {min: X, max: X}`,
          },
          ...aiPromptExamples.examples,
          {
            role: "user",
            content: expandInput(userInput),
          },
        ];
      };

      try {
        const completion = await openai.beta.chat.completions.parse({
          model: "gpt-4o-2024-08-06",
          messages: createPromptWithExamples(userInput),
          temperature: 0,
          response_format: ResponseSchema,
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
