import { Router, Request, Response } from "express";
import * as finnhub from "finnhub";

const router = Router();

type FinnhubQuote = {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
};

const getClient = () => {
    const apiKey = process.env.FINNHUB_API_KEY;

    if (!apiKey) {
        return null;
    }

    return new finnhub.DefaultApi(apiKey);
};

const handleStockQuote = async (req: Request, res: Response) => {
    try {
        const symbol = String(req.params.symbol || req.query.symbol || "")
            .trim()
            .toUpperCase();

        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: "Stock symbol is required",
            });
        }

        const client = getClient();

        if (!client) {
            return res.status(500).json({
                success: false,
                message: "FINNHUB_API_KEY is not configured",
            });
        }

        const quote = await new Promise<FinnhubQuote>((resolve, reject) => {
            client.quote(symbol, (error, data) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(data as FinnhubQuote);
            });
        });

        return res.status(200).json({
            success: true,
            symbol,
            data: {
                currentPrice: quote.c,
                change: quote.d,
                percentChange: quote.dp,
                high: quote.h,
                low: quote.l,
                open: quote.o,
                previousClose: quote.pc,
                timestamp: quote.t,
            },
        });
    } catch (error) {
        console.error("Error fetching stock quote:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch stock price",
        });
    }
};

router.get("/", handleStockQuote);
router.get("/:symbol", handleStockQuote);

export default router;
