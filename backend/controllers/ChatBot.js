// const axios = require('axios');
// require('dotenv').config();

// exports.ChatBot = async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await axios.post(
//       "https://api.cohere.ai/generate",
//       {
//         model: "command-xlarge",
//         prompt: message,
//         max_tokens: 100,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Debugging the response structure
//     console.log(JSON.stringify(response.data, null, 2));

//     // Check if 'text' field exists
//     if (response.data && response.data.text) {
//       return res.json({ reply: response.data.text });
//     } else {
//       throw new Error("Unexpected response format from Cohere API");
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//     return res.status(500).json({ message: "Error connecting to AI" });
//   }
// };


const axios = require('axios');
require('dotenv').config();

exports.ChatBot = async (req, res) => {
  const { message } = req.body;

  // Define a refined prompt to keep the chatbot focused
  const refinedPrompt = `
    You are a highly skilled personal trainer and fitness expert AI. 
    Only answer questions related to fitness, gym exercises, health, nutrition, or workout plans. 
    If the question is unrelated, politely respond with: "I'm here to assist with fitness and health-related queries only." 
    
    User: ${message}
    AI:
  `;

  try {
    const response = await axios.post(
      "https://api.cohere.ai/generate",
      {
        model: "command-xlarge",
        prompt: refinedPrompt,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Debugging the response structure
    console.log(JSON.stringify(response.data, null, 2));

    // Check if 'text' field exists
    if (response.data && response.data.text) {
      return res.json({ reply: response.data.text.trim() });
    } else {
      throw new Error("Unexpected response format from Cohere API");
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Error connecting to AI" });
  }
};
