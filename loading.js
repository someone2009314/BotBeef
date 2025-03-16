const dotenv = require("dotenv");
dotenv.config();

//const API_KEY = process.env.API_KEY;
//console.log("the api key is "+ API_KEY);
async function text() {
  const prompt = localStorage.getItem("prompt");

  if (!prompt) {
    console.log("Prompt not found in localStorage");
    return; // Early exit if prompt is null
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST", // Corrected key
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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", // Make sure API_KEY is defined
      },
      body: JSON.stringify({
        temperature: 1.0,
        max_tokens: 500,
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content:
              "Give me 16 lines in where 2 rappers are rapping against each other (1 is kendrick lamar and 2 is drake) and each get 4 lines each, in the specific format of '1: (lines) 2: (lines)...' do not state anything else, with the theme of " +
              prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.log(response.error);
      throw new Error("Failed to fetch response from API");
    }

    const responseData = await response.json();
    const generatedText = responseData.choices[0].message.content; // Corrected path
    localStorage.setItem("generatedText", generatedText);
    console.log(generatedText); // Log or do something with the response
  } catch (error) {
    console.log("Error:", error);
  }
  window.location.href = "play.html";
}
