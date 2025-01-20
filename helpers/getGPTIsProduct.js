import openai from './openAi.js'

/**
 * Generate a results based on provided context and query parameters,
 * ensuring required fields are included,
 * and returns the parsed data or null if unsuccessful.
 * @param { String } context
 * @param { Object } query
 * @param { Array} query
 */
const getGPTIsProduct = async ({ context }) => {
  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: "You are an assistant that determines if a given context represents a product for sale."
      },
      {
        role: "user",
        content: `Does the following context of html describe a product for sale? If yes, return "true". Otherwise, return "false".
          Context: ${JSON.stringify(context)}`
      }
    ],
  })
  const result = res.choices[0]?.message?.content?.trim();
  return result === "true";
}

export default getGPTIsProduct
