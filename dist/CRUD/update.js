"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("../database/data"));
const router = express_1.default.Router();
router.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = req.params;
        const body = req.body;
        const updatedData = yield data_1.default.findOneAndUpdate({
            _id: id,
            userID: userId,
        }, {
            $set: body,
        }, {
            new: true,
            runValidators: true,
        });
        if (!updatedData) {
            return res
                .status(403)
                .json({ message: "Data not found or you are not allowed to update this data" });
        }
        return res.status(200).json({
            message: "Data updated successfully",
            updatedData,
        });
    }
    catch (e) {
        next(e);
    }
}));
exports.default = router;
