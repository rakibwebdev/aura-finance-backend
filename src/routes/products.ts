import { Router, Request, Response } from "express";
import Product from "../models/Product";

const router = Router();

/**
 * @route   GET /api/products/:barcode
 * @desc    Get a single product by its barcode
 * @access  Public
 */
router.get("/:barcode", async (req: Request, res: Response) => {
    try {
        const { barcode } = req.params;

        const product = await Product.findOne({ barcode });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found with the provided barcode",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error("Error fetching product by barcode:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

export default router;
