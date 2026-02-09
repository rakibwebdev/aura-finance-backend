import { Router, Request, Response } from "express";
import User from "../models/User";

const router = Router();

// Get all users
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

// Create new user
router.post("/", async (req: Request, res: Response) => {
    try {
        const { email, password, name, weeklyBudget } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // In production, hash the password with bcrypt
        const user = new User({
            email,
            password, // TODO: Hash this with bcrypt
            name,
            weeklyBudget: weeklyBudget || 0,
        });

        await user.save();

        // Return user without password
        const userResponse = user.toObject();
        const { password: _, ...userWithoutPassword } = userResponse;

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ error: "Failed to create user" });
    }
});

// Update user
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { name, weeklyBudget } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, weeklyBudget },
            { new: true },
        ).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: "Failed to update user" });
    }
});

// Delete user
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

export default router;
