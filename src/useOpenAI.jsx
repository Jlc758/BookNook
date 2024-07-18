import OpenAI from "openai";

async function UseOpenAI({ userInput }) {
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
                  Example for System: Prompt -- Looking for a true crime novel less than 500 pages in length set in the 1930s. Response -- {
                    'categories': 'true crime',
                    'pageCount': 500,
                    'keywords': '1930s'
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

  const responseObject = JSON.parse(response.choices[0].message.content);

  console.log("Response Object: ", responseObject);

  return responseObject;
}

export default UseOpenAI;

// async function useOpenAI() {
//   const openai = new OpenAI({
//     apiKey: import.meta.env.OPENAI_API_KEY,
//   });

//   const response = await openai.chat.completions.create({
//     model: "gpt-4o",
//     response_format: { type: "json_object" },
//     messages: [
//       {
//         role: "system",
//         content: [
//           {
//             type: "text",
//             text: "You are an expert at extracting key words from natural language input from user and converting it to json format.  Key words will be used to search for books in Google Books API database.  Example:\n\nPrompt:  Looking for a true crime novel less than 500 pages long.\n\nResponse:  {\n'categories': 'true crime',\n'pageCount': 500,\n}",
//           },
//         ],
//       },
//       {
//         role: "user",
//         content: [
//           {
//             type: "text",
//             text: "I'm looking for a fantasy novel with dragons that is more than 300 pages in length",
//           },
//         ],
//       },
//       {
//         role: "assistant",
//         content: [
//           {
//             type: "text",
//             text: "{\n  'categories': 'fantasy',\n  'keywords': 'dragons',\n  'pageCountMin': 300\n}",
//           },
//         ],
//       },
//     ],
//     temperature: 0,
//     max_tokens: 256,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//   });
//   console.log(response);
// }

// export default useOpenAI;
