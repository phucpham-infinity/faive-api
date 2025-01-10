import openai from './openAi.js'

/**
 * Generate a results based on provided context and query parameters,
 * ensuring required fields are included,
 * and returns the parsed data or null if unsuccessful.
 * @param { String } context
 * @param { Object } query
 * @param { Array} query
 */
const getGPTData = async ({ context, query, required = [] }) => {
  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: context,
      },
      {
        role: 'user',
        content:
          'Create a new Results Object based on the given context only. Do not assume anything. If can not parse exact data of any field so return nothing or null',
      },
    ],
    functions: [
      {
        name: 'createResultsObject',
        parameters: {
          type: 'object',
          properties: query,
          required,
        },
      },
    ],
    function_call: { name: 'createResultsObject' },
  })

  const data = res.choices[0]?.message?.function_call?.arguments ?? null
  return data ? JSON.parse(data) : null
}

export default getGPTData
