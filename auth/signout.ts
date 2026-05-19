import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "failed to sign out" });
        }

        res.clearCookie("jsv.sid", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({ message: "signed out" });
    });
});

export default router;
