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

productSchema.index({ productId: 1}, {unique: true});

export default mongoose.model("Product", productSchema);
