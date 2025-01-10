import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Fetch all faivelists of a user request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res) => {
  const { q, sort } = req.query
  const currentUser = req.user._id
  const user = req.query.user ?? req.user._id

  let query = { user }
  if (q) {
    const reg = new RegExp(q, 'i')
    console.log('Reg', reg)
    query = { ...query, name: reg }
  }

  let querySort = { updatedAt: -1 }

  if (sort) {
    const key = sort[0] === '-' ? sort.substring(1) : sort
    delete querySort.updatedAt
    querySort[key] = sort[0] === '-' ? -1 : 1
  }

  const faiveListsPre = await TaxonomyTerm.aggregate([
    {
      $match: query,
    },
    {
      $sort: querySort
    },
    {
      $lookup: {
        from: 'productsusers',
        localField: '_id',
        foreignField: 'faivelist',
        as: 'images',
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'images.product',
        foreignField: '_id',
        as: 'images',
        pipeline: [
          {
            $sort: { updatedAt: -1 },
          },
          {
            $limit: 4,
          },
        ],
      },
    },
  ])

  const countProducts = await UserProduct.aggregate([
    {
      $match: query,
    },
    {
      $group: {
        _id: '$faivelist',
        count: { $sum: 1 },
      },
    },
  ])

  // console.log(countProducts)

  const faivelists = faiveListsPre.map((el) => {
    const total = countProducts.filter(
      (list) => JSON.stringify(list._id) === JSON.stringify(el._id)
    )

    return {
      ...el,
      productsCount: total.length > 0 ? total?.[0].count : 0,
      images: el.images.map((x) => x.image[0]),
    }
  })

  res.status(200).json({
    status: 'success',
    total: faivelists.length,
    faivelists,
  })
})
