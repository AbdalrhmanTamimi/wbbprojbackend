import express from "express";
import data from "../database/data";
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const Data = await data.find();

        res.status(200).json({
            success: true,
            count: Data.length,
            Data,
        });

    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            success: false,
            message,
        });
    }
});
export default router;
