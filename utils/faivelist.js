import uuid4 from 'uuid4'

import TaxonomyTerm from '../models/taxonomyTerm.js'

class Faivelist {
  constructor({ name, user, id }) {
    this.name = name
    this.user = user
    this.id = id
  }

  async create() {
    const url = uuid4()

    const faivelist = await TaxonomyTerm.create({
      name: this.name,
      user: this.user,
      url,
    })

    return faivelist
  }
}

export default Faivelist
