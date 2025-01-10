import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'
import ProductsUsers from '../../models/userProduct.js'
import mongoose from 'mongoose'

/**
 * Fetch single faivelist request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const currentUser = req.user._id
  const user = req.query.user ?? req.user._id
  const { id: _id } = req.params

  // const faiveList = await TaxonomyTerm.findOne({ user, _id })
  const faivelists = await TaxonomyTerm.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(_id),
        user: new mongoose.Types.ObjectId(user),
      },
    },
    {
      $lookup: {
        from: 'productsusers',
        localField: '_id',
        foreignField: 'faivelist',
        as: 'products',
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'products',
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

  if (!faivelists || faivelists.length === 0)
    return next(
      new AppError('No faivelist found in your profile with that id', 404)
    )

  const productsCount = await ProductsUsers.countDocuments({
    user,
    faivelist: _id,
  })

  faivelists[0].images = faivelists[0].products
    .map((p) => p.image[0])
    .filter((i) => i)
  delete faivelists[0].products

  res.status(200).json({
    status: 'success',
    faivelist: { ...faivelists[0], productsCount },
  })
})
