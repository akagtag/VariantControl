const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/product.model.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from node api");
});

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/api/products", async (req, res) => {
    try {
        if (!req.body.colour || !req.body.size || !req.body.material) {
            return res
                .status(400)
                .json({ message: "Color, size, and material are required" });
        }

        const product_api = new Product({
            colour: req.body.colour,
            size: req.body.size,
            material: req.body.material,
            image: req.body.image || "", // Default to empty string if image is not provided
        });

        await product_api.save();
        res.status(201).json(product_api);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a product
app.put("/api/products/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Search for a product
app.get("/api/products/search/:name", async (req, res) => {
    try {
        const products = await Product.find({
            name: { $regex: req.params.name, $options: "i" },
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Connect to MongoDB
mongoose
    .connect(
        "mongodb+srv://akshataga20:cGoaeRbCo6dDaIjE@backenddb.k7ljmg7.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
