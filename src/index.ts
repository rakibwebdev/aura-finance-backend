import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import transactionRoutes from "./routes/transactions";
import categoryRoutes from "./routes/categories";
import userRoutes from "./routes/users";
import productRoutes from "./routes/products";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:8100",
            "http://127.0.0.1:5173", // <--- Fixes Vite IP issues
            "http://127.0.0.1:8100", // <--- Fixes Ionic IP issues
            "capacitor://localhost", // <--- Fixes iOS Native
            "http://localhost", // <--- Fixes Android Native
            "https://aura-finance-app.vercel.app", // <--- Production URL
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Aura Finance API",
        version: "1.0.0",
        status: "running",
    });
});

app.get("/api/health", (req: Request, res: Response) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
    });
});

// API Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// MongoDB Connection
const connectDB = async () => {
    try {
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("MongoDB connected successfully");
        } else {
            console.log("MongoDB URI not provided, running without database");
        }
    } catch (error) {
        console.error(
            "MongoDB connection error:",
            error instanceof Error ? error.message : error,
        );
        console.log("Continuing without database connection...");
    }
};

// Start server
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    });
};

startServer();

export default app;
