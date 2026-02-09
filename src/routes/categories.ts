import { Router, Request, Response } from "express";
import Category from "../models/Category";

const router = Router();

// Get all categories for a specific user
router.get("/user/:userId", async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({
            userId: req.params.userId,
        }).sort({ createdAt: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

// Get all categories
router.get("/", async (req: Request, res: Response) => {
    try {
        const categories = await Category.find().sort({ createdAt: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

// Get category by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch category" });
    }
});

// Create new category
router.post("/", async (req: Request, res: Response) => {
    try {
        const { name, icon, color, budgetLimit, userId } = req.body;

        // Check if category already exists for this user
        const existingCategory = await Category.findOne({
            name: name,
            userId: userId,
        });

        if (existingCategory) {
            return res
                .status(400)
                .json({ error: "Category already exists for this user" });
        }

        const category = new Category({
            name,
            icon: icon || "pricetag",
            color: color || "#6366f1",
            budgetLimit: budgetLimit || 0,
            userId,
        });

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: "Failed to create category" });
    }
});

// Update category
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { name, icon, color, budgetLimit } = req.body;

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, icon, color, budgetLimit },
            { new: true },
        );

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json(category);
    } catch (error) {
        res.status(400).json({ error: "Failed to update category" });
    }
});

// Update category budget
router.put("/:id/budget", async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { budgetLimit: req.body.budgetLimit },
            { new: true },
        );
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: "Failed to update category budget" });
    }
});

// Delete category
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete category" });
    }
});

export default router;
