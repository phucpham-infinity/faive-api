import TaxonomyTerm from '../../models/taxonomyTerm.js'

export default class FaivelistShareController {
  // Generate shared object with type faivelist and faivelist data
  static async generate(data) {
    return {
      type: 'faivelist',
      payload: data,
    }
  }

  // Expand a shared faivelist object and return the faivelist
  static async expand(sharedObj) {
    if (!sharedObj) return null

    const id = sharedObj?.payload?.id

    const faivelist = await TaxonomyTerm.findById(id)

    return faivelist
  }
}
