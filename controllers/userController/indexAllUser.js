import catchAsync from "../../utils/catchAsync.js";
import User from "../../models/user.js";
import AppError from "../../utils/apiError.js";
import {meiseSyncMq} from "../../queue/index.js";
import {MEISE_SYNC_JOBS} from "../../queue/constans.js";
import {generateNgrams} from "../../utils/generateNgrams.js";


export default catchAsync(async (req, res, next) => {
    const users = await User.find();
    if (!users || !users?.length) return next(new AppError('No user found', 404))
    const indexUsers = users.map(x => ({
        _id: x._id,
        first_name: x.first_name,
        last_name: x.last_name,
        email: x.email,
        'ngrams': generateNgrams([x.first_name, x.last_name, x.email], 3, 5)
    }))
    const indexData = await meiseSyncMq.add(MEISE_SYNC_JOBS.ADD_INDEX_USER, indexUsers);
    res.status(200).json({
        status: 'success',
        data: indexUsers,
    })
})