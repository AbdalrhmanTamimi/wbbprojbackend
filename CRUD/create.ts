import express from "express";
import data from "../database/data";
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const newData = await data.create(req.body);

        res.status(201).json({
            success: true,
            data: newData,
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