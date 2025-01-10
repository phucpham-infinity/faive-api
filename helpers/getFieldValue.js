/**
 * Filters and validates input values based on specified fields and required fields,
 * returning the valid data or throwing an error if any required field is missing.
 * @param { Array } values
 * @param { Array } fields
 * @param { Array } requiredFields
 * @returns { Array }
 */
export default function (values, fields, requiredFields) {
  let data = {}

  // Return exits field values
  fields.forEach((field) => {
    if (values[field] === null) return

    if (values.hasOwnProperty(field)) {
      data[field] = values[field]
    }
  })

  // Throw error if any required field value is missing
  requiredFields.forEach((field) => {
    if (data[field] === '') throw Error(`${field} is required`, 400)
  })

  return data
}
