import mongoose from "mongoose";
import argon2 from "argon2";

const productSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
            trim: true,
        },
        productId: {
            type: String,
            required: false,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        priceCurrency: {
            type: String,
            required: true,
            trim: true,
        },
        previousPrice: {
            type: Number,
            required: false,
            min: 0,
        },
        discountPercentage: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: [String],
            default: [],
        },
        site: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Site",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.pre("save", async function (next) {
    if (!this.productId && this.url) {
        try {
            const hash = await argon2.hash(this.url, {type: argon2.argon2id});
            this.productId = hash.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

productSchema.index({ productId: 1}, {unique: true});

export default mongoose.model("Product", productSchema);
