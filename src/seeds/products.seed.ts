import mongoose from "mongoose";
import Product from "../models/Product";
import dotenv from "dotenv";

dotenv.config();

const DUMMY_PRODUCTS = [
    { name: "Wireless Headphones", price: 79.99, barcode: "A-0010-Z" },
    { name: "USB-C Cable", price: 12.99, barcode: "A-0020-Z" },
    { name: "Play Station 5", price: 599.0, barcode: "A-0030-Z" },
    { name: "Starbucks Coffee", price: 9.99, barcode: "A-0040-Z" },
    { name: "Power Bank", price: 34.99, barcode: "A-0050-Z" },
    { name: "Organic Steak", price: 29.99, barcode: "A-0060-Z" },
    { name: "Laptop Stand", price: 44.99, barcode: "A-0070-Z" },
    { name: "Desk Lamp", price: 39.99, barcode: "A-0080-Z" },
    { name: "Mechanical Keyboard", price: 59.99, barcode: "A-0090-Z" },
    { name: "Vitamins Supplement", price: 24.99, barcode: "A-0100-Z" },
];

async function seedProducts() {
    try {
        const mongoUri =
            process.env.MONGODB_URI || "mongodb://localhost:27017/aura-finance";

        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");

        // Insert dummy products
        const createdProducts = await Product.insertMany(DUMMY_PRODUCTS);
        console.log(
            `✅ Seeded ${createdProducts.length} products successfully`,
        );

        // Display created products
        createdProducts.forEach((product) => {
            console.log(
                `- ${product.name}: $${product.price} (Barcode: ${product.barcode})`,
            );
        });

        await mongoose.connection.close();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
}

seedProducts();
