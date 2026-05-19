import express from "express";

import Data from "../database/data.js"; 

const router = express.Router();

router.put("/:id", async (req, res, next) => {
    try {
        const userId = req.session?.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;

        const body = req.body;

        
        const updatedData = await Data.findOneAndUpdate(
            {
                _id: id,
                userID: userId, 
            },
            {
                $set: body,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedData) {
            return res
                .status(403)
                .json({ message: "Data not found or you are not allowed to update this data" });
        }

    
        return res.status(200).json({
            message: "Data updated successfully",
            updatedData,
        });
    } catch (e) {
        next(e);
    }
});

export default router;
