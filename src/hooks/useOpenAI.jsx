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

          {
            role: "user",
            content: "harry potter",
          },

          {
            role: "assistant",
            content: `{
                    'title': harry potter
                  }`,
          },
        ],
      };

      const createPromptWithExamples = (userInput) => {
        return [
          {
            role: "system",
            content: `Convert user input to JSON format for book search, adhering strictly to these rules:

            1. ONLY use words and phrases EXACTLY as provided by the user. Do not add, infer, or search for ANY additional terms.
            2. Do not categorize, classify, or interpret the user's input in any way.
            3. 'keywords' field: Include ALL user-provided terms that are not explicitly labeled as a category.
            4. 'mainCategory' field: ONLY fill if the user explicitly states a category or genre. Otherwise, omit this field.
            5. Page count: Only include if explicitly mentioned by the user:
              - 'less than X pages': {max: X, min: null}
              - 'more than X pages': {min: X, max: null}
              - 'around X pages': {min: X - 50, max: X + 50}
              - exact page count: {min: X, max: X}

            6. Omit any fields that would be empty.
            7. Do NOT perform any additional searches or lookups based on the user's input.

            Output the JSON result only. If the user's input doesn't fit these criteria, return an empty JSON object {}.`,
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
