//// This file is intended for AI-based evaluation of generated content quality. It uses OpenAI's API to assess whether the generated follow-up email content meets certain criteria such as professionalism, clarity, and relevance. The function `evaluateEmailQuality` takes the generated text as input and returns a boolean indicating whether it passed the evaluation.
// import OpenAI from 'openai';

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function evaluateEmailQuality(text: string): Promise<boolean> {
//   const prompt = `
// You are a QA evaluator.

// Evaluate the following generated email based on:
// - Professional tone
// - Clarity
// - Relevance for a follow-up email

// Answer ONLY with "PASS" or "FAIL".

// Email:
// ${text}
// `;

//   const response = await client.responses.create({
//     model: 'gpt-4.1-mini',
//     input: prompt,
//   });

//   //const result = response.output[0].content[0].text.trim();
//     const result = response.output_text.trim();
//   console.log('AI Evaluation Result:', result);
//   return result.toLowerCase().includes('pass');
// }
/*
  This file is intended for AI-based evaluation of generated content quality. 
  It uses a local Ollama instance (Ollama is running on your own computer as a server) to assess whether the generated follow-up email content meets certain criteria such as professionalism, clarity, and relevance. 
  The function `evaluateEmailQualityLocal` takes the generated text as input and returns a boolean indicating whether it passed the evaluation.

  To use a local Ollama instance instead of OpenAI for evaluation, we can modify the code to send a request to the local API endpoint. Below is an example implementation of the `evaluateEmailQualityLocal` function that interacts with a local Ollama instance.
  Make sure to have your local Ollama instance running and accessible at the specified URL. The function sends a prompt to the Ollama API and processes the response to determine if the generated email content meets the quality criteria.
  
*/
import axios from 'axios';

type OllamaResponse = {
  response: string;
};

export async function evaluateEmailQualityLocal(text: string): Promise<boolean> {
  const prompt = `
You are a QA evaluator.

Check whether this generated message is:
- professional
- clear
- appropriate for a follow-up message

Answer with only one word: PASS or FAIL.

Message:
${text}
`;

  const response = await axios.post<OllamaResponse>(
    'http://localhost:11434/api/generate',
    {
      model: 'llama3.2',
      prompt,
      stream: false,
    },
    {
    timeout: 10000, // 10 seconds
    }
  );

  console.log('Ollama Evaluation Result:', response.data.response);

  const result = response.data.response.trim().toLowerCase();

  return result === 'pass';
}
