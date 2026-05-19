import express from "express";
import data from "../database/data";

const router = express.Router();

router.delete("/:id", async (req, res, next) => {
    try {
        const userId = (req.session as any).userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = req.params;
        const deletedData = await data.findOneAndDelete({
            _id: id,
            userID: userId,
        });

        if (!deletedData) {
            return res
                .status(403)
                .json({ message: "You are not allowed to delete this data" });
        }

        return res.status(200).json({
            message: "Data deleted successfully",
            deletedData,
        });
    } catch (e) {
        next(e);
    }
});

export default router;
