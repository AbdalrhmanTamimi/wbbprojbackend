import express from "express";
import data from "../database/data";
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const newData = await Data.create(req.body);

        res.status(201).json({
            success: true,
            data: newData,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
export default router;