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
import { z } from "zod";

function useOpenAI(userInput, apiKey) {
  const [keywords, setKeywords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInput || !apiKey) {
      setKeywords(null);
      setError(null);
      return;
    }

    const fetchKeywords = async () => {
      setLoading(true);
      setError(null);

      const openai = new OpenAI({
        apiKey: apiKey,
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

      const BookSearchSchema = z.object({
        keywords: z.array(z.string()),
        mainCategory: z.string(),
        title: z.string(),
      });

      const aiPromptExamples = {
        examples: [
          {
            role: "user",
            content: "throne of glass",
          },
          {
            role: "assistant",
            content: `{
              "title": "throne of glass",
              "mainCategory": "",
              "keywords": ["throne", "glass"]
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
              "title": "",
              "mainCategory": "True Crime",
              "keywords": ["female", "detective", "less than 300 pages"]
            }`,
          },
          {
            role: "user",
            content: "dahmer",
          },
          {
            role: "assistant",
            content: `{
              "title": "",
              "mainCategory": "",
              "keywords": ["dahmer"]
            }`,
          },
          {
            role: "user",
            content: "harry potter",
          },
          {
            role: "assistant",
            content: `{
              "title": "harry potter",
              "mainCategory": "",
              "keywords": ["harry", "potter"]
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
            4. 'mainCategory' field: ONLY fill if the user explicitly states a category or genre. Otherwise, leave it as an empty string.
            5. 'title' field: If the input appears to be a book title, include it here. Otherwise, leave it as an empty string.
            6. Do NOT perform any additional searches or lookups based on the user's input.

            Output the JSON result only. If the user's input doesn't fit these criteria, return an object with empty strings for title and mainCategory, and an empty array for keywords.

            Your response should be a valid JSON object matching the following schema:
            {
              "type": "object",
              "properties": {
                "keywords": {
                  "type": "array",
                  "items": { "type": "string" },
                  "description": "List of common words found in the description of a book. If value cannot be determined, return an empty array"
                },
                "mainCategory": {
                  "type": "string",
                  "enum": ${JSON.stringify([
                    ...genres.map((genre) => genre.label),
                    "",
                  ])},
                  "description": "Main category or genre of the book. If a common category is not requested, return an empty string"
                },
                "title": {
                  "type": "string",
                  "description": "If value cannot be determined, return an empty string"
                }
              },
              "required": ["keywords", "mainCategory", "title"],
              "additionalProperties": false
            }`,
          },
          ...aiPromptExamples.examples,
          {
            role: "user",
            content: userInput,
          },
        ];
      };

      const expandedInput = expandInput(userInput);
      console.log("Expanded user input: ", expandedInput);

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-2024-08-06",
          messages: createPromptWithExamples(expandedInput),
          temperature: 0,
          response_format: { type: "json_object" },
        });

        console.log("Raw API response:", JSON.stringify(completion, null, 2));

        const responseMessage = completion.choices[0].message;
        console.log("Response message:", responseMessage);

        if (responseMessage.refusal) {
          console.log(
            "API refused to provide a response: ",
            responseMessage.refusal
          );
          setError("API refused to provide a response.");
        } else if (responseMessage.content) {
          try {
            const parsedContent = JSON.parse(responseMessage.content);
            console.log("Parsed content:", parsedContent);

            // Validate the parsed content against our schema
            const validatedContent = BookSearchSchema.parse(parsedContent);
            setKeywords(validatedContent);
          } catch (parseError) {
            console.error(
              "Error parsing or validating JSON content:",
              parseError
            );
            console.log(
              "Raw content causing parse error:",
              responseMessage.content
            );
            setError("Error parsing or validating API response");
          }
        } else {
          console.log("Unexpected response format:", responseMessage);
          setError("Unexpected API response format");
        }
      } catch (e) {
        console.error("Full error:", e);
        if (e.response) {
          console.error("API response:", e.response.data);
        }
        setError(e.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchKeywords();
  }, [userInput, apiKey]);

  return { keywords, loading, error };
}

export default useOpenAI;
