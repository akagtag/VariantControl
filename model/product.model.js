const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    colour: {
        type: String,
        required: [true, "Product colour is required"],
    },
    size: {
        type: String,
        required: [true, "Product size is required"],
        default: "S",
    },
    material: {
        type: String,
        required: [true, "Product material is required"],
        default: "Cotton",
    },
    image: {
        type: String,
        required: false,
    },
    timestap: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
