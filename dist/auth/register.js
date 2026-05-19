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
const users_1 = __importDefault(require("../database/users"));
const express_1 = __importDefault(require("express"));
const error_1 = __importDefault(require("../class/error"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const successfully_1 = __importDefault(require("../class/successfully"));
const router = express_1.default.Router();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (yield users_1.default.findOne({ username: body.username })) {
            return res.status(error_1.default.error('').status).json(error_1.default.error('this username already exists'));
        }
        const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
        const newUser = new users_1.default({ username: body.username, password: hashedPassword });
        yield newUser.save();
        req.session.userId = newUser._id;
        return res.status(successfully_1.default.created('').status).json(successfully_1.default.created('done create user').json);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = router;
