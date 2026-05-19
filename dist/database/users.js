"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true
    }, password: {
        type: String,
        required: true,
    }, email: {
        type: String,
        minlength: 5,
        unique: true
    }
});
exports.default = mongoose_1.default.model('Users', schema);
