import catchAsync from "../../utils/catchAsync.js";
import User from "../../models/user.js";
import AppError from "../../utils/apiError.js";
import UserProfile from '../../models/userProfile.js'
import {elasticsearchClient} from "../../utils/elasticsearch.js";


export default catchAsync(async (req, res, next) => {
    const users = await User.find();
    if (!users || !users?.length) return next(new AppError('No user found', 404))
    // const indexUsers  = await bulkIndexUsers(users)
    for (const user of users) {
        const userProfile = await UserProfile.findOne({user: user._id});
        if (userProfile) {
            await elasticsearchClient.update({
                index: "user",
                id: user._id.toString(),
                body: {
                    doc: {
                        profile: userProfile,
                    }
                },
            });
        }
    }
    res.status(200).json({
        status: 'success',
    })
})