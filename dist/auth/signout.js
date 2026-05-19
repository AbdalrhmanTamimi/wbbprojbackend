"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
exports.default = router;
