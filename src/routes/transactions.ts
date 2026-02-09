import { Router, Request, Response } from "express";
import Transaction from "../models/Transaction";

const router = Router();

// Get all transactions for a specific user
router.get("/user/:userId", async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.find({
            userId: req.params.userId,
        }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
});

// Get all transactions
router.get("/", async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
});

// Get transaction by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch transaction" });
    }
});

// Create new transaction
router.post("/", async (req: Request, res: Response) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: "Failed to create transaction" });
    }
});

// Update transaction
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: "Failed to update transaction" });
    }
});

// Delete transaction
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete transaction" });
    }
});

export default router;
