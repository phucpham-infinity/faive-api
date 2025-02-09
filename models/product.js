import mongoose from "mongoose";
import {productModelHook} from "./hooks/product.hook.js";

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
        pinnedAt: {
            type: Date,
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.index({ productId: 1}, {unique: true});
productModelHook(productSchema);

export default mongoose.model("Product", productSchema);
